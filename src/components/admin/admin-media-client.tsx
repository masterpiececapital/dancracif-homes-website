"use client";

import * as React from "react";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Folder,
  X,
  Loader2,
  FileImage,
} from "lucide-react";
import toast from "react-hot-toast";
import { MediaAsset } from "@/lib/db/entities/MediaAsset";
import { getMediaAssets, deleteMediaAsset } from "@/app/actions/admin-content";
import { ViewToggle } from "./ui/view-toggle";
import { ConfirmModal } from "./ui/confirm-modal";
import { ImageUploader } from "./ui/image-uploader";
import { CardSkeletonGrid, ListSkeletonTable } from "./ui/skeleton-loaders";

interface AdminMediaClientProps {
  initialAssets: MediaAsset[];
}

export function AdminMediaClient({ initialAssets }: AdminMediaClientProps) {
  const [assets, setAssets] = React.useState<MediaAsset[]>(initialAssets);
  const [view, setView] = React.useState<"card" | "list">("card");
  const [search, setSearch] = React.useState("");
  const [selectedFolder, setSelectedFolder] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [uploadedUrl, setUploadedUrl] = React.useState("");
  const [uploadFolder, setUploadFolder] = React.useState("general");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = React.useState<MediaAsset | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const reloadAssets = async () => {
    setIsLoading(true);
    try {
      const fresh = await getMediaAssets(
        selectedFolder === "all" ? undefined : selectedFolder,
        search
      );
      setAssets(fresh);
    } catch {
      toast.error("Failed to load assets");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteMediaAsset(deleteTarget.id);
      setAssets((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      toast.success("Media asset deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete media asset");
    } finally {
      setIsDeleting(false);
    }
  };

  const folders = [
    { id: "all", label: "All Assets" },
    { id: "hero", label: "Hero & Landmarks" },
    { id: "units", label: "Estate Units" },
    { id: "blog", label: "Blog & News" },
    { id: "general", label: "General" },
  ];

  const filteredAssets = assets.filter((asset) => {
    if (selectedFolder !== "all" && asset.folder !== selectedFolder) {
      return false;
    }
    if (
      search &&
      !asset.name.toLowerCase().includes(search.toLowerCase()) &&
      !asset.altText?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by file name or alt text..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/70 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white transition-all"
            />
          </div>

          {/* Folder tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/60 text-xs overflow-x-auto">
            {folders.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFolder(f.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedFolder === f.id
                    ? "bg-white text-[#00ABF0] shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            type="button"
            onClick={() => {
              setUploadedUrl("");
              setIsUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        view === "card" ? (
          <CardSkeletonGrid count={6} />
        ) : (
          <ListSkeletonTable rows={6} />
        )
      ) : filteredAssets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <FileImage className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No media assets found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Upload images, architectural renders, or floor plans to store them in your Cloudinary asset library.
          </p>
          <button
            type="button"
            onClick={() => {
              setUploadedUrl("");
              setIsUploadModalOpen(true);
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0754C6] text-white text-xs font-bold hover:bg-[#0648AB] cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload to Cloudinary</span>
          </button>
        </div>
      ) : view === "card" ? (
        /* CARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                <img
                  src={asset.secureUrl || asset.url}
                  alt={asset.altText || asset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                  {asset.folder || "general"}
                </span>

                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(asset.secureUrl || asset.url, asset.id)
                    }
                    className="p-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-xs cursor-pointer"
                    title="Copy Image URL"
                  >
                    {copiedId === asset.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={asset.secureUrl || asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-xs cursor-pointer"
                    title="View Original"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(asset)}
                    className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-xs cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate" title={asset.name}>
                    {asset.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                    <span>{formatFileSize(asset.bytes)}</span>
                    <span>·</span>
                    <span className="uppercase">{asset.format || "image"}</span>
                    {asset.width > 0 && (
                      <>
                        <span>·</span>
                        <span>
                          {asset.width}x{asset.height}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(asset.secureUrl || asset.url, asset.id)
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00ABF0] hover:underline cursor-pointer"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(asset)}
                    className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Preview & Name</th>
                <th className="py-3 px-4">Folder</th>
                <th className="py-3 px-4">Size & Format</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img
                          src={asset.secureUrl || asset.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate max-w-sm">
                          {asset.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-sm font-mono">
                          {asset.secureUrl || asset.url}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                      {asset.folder || "general"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {formatFileSize(asset.bytes)} ({asset.format?.toUpperCase() || "IMG"})
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(asset.secureUrl || asset.url, asset.id)
                        }
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#00ABF0] hover:bg-slate-100 cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === asset.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={asset.secureUrl || asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                        title="View Original"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(asset)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsUploadModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0754C6]/10 text-[#00ABF0] flex items-center justify-center">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Upload to Media Library
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Uploaded media is hosted via Cloudinary CDN
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Destination Folder
                </label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                >
                  <option value="general">General Assets</option>
                  <option value="hero">Hero & Landmarks</option>
                  <option value="units">Estate Units</option>
                  <option value="blog">Blog & Updates</option>
                </select>
              </div>

              <ImageUploader
                value={uploadedUrl}
                onChange={async (url) => {
                  setUploadedUrl(url);
                  await reloadAssets();
                  setIsUploadModalOpen(false);
                }}
                folder={uploadFolder}
                label="Select Media File"
                hint="Images will be saved to your library automatically"
              />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Media Asset"
        description="Are you sure you want to delete this media file? It will be removed from Cloudinary and any pages referencing it."
        itemName={deleteTarget?.name}
        confirmText="Delete Asset"
        isLoading={isDeleting}
      />
    </div>
  );
}
