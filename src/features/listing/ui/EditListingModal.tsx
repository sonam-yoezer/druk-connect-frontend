"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Listing } from "../types/listing";
import type { UpdateListingData } from "../api/updateListing";
import { AvailabilityDaysField } from "./AvailabilityDaysField";
import { availabilityDays } from "../utils/availability";

type Props = { listing: Listing; isUpdating: boolean; error?: string; onClose: () => void; onSubmit: (data: UpdateListingData) => void };
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export function EditListingModal({ listing, isUpdating, error, onClose, onSubmit }: Props) {
  const [pricingType, setPricingType] = useState(listing.pricingType);
  const [rateAmount, setRateAmount] = useState(listing.rateAmount?.toString() ?? "");
  const [availability, setAvailability] = useState(() => availabilityDays(listing.availability));
  const [retainedIds, setRetainedIds] = useState(() => listing.images.map(image => image.imageId));
  const [uploads, setUploads] = useState<File[]>([]);
  const [validationError, setValidationError] = useState("");

  function addImages(files: File[], replaceId?: string) {
    if (files.some(file => !allowedTypes.includes(file.type))) { setValidationError("Only JPEG, PNG and WEBP images are allowed."); return; }
    const keep = replaceId ? retainedIds.filter(id => id !== replaceId) : retainedIds;
    if (keep.length + uploads.length + files.length > 5) { setValidationError("A listing can contain at most 5 images. Remove an image before adding another."); return; }
    setRetainedIds(keep); setUploads(current => [...current, ...files]); setValidationError("");
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setValidationError("");
    if (!availability.length) { setValidationError("Select at least one available day."); return; }
    if (pricingType === "PAID" && (!Number.isFinite(Number(rateAmount)) || Number(rateAmount) <= 0)) { setValidationError("Enter a rate amount greater than zero for a paid listing."); return; }
    if (retainedIds.length + uploads.length < 1 || retainedIds.length + uploads.length > 5) { setValidationError("Keep between 1 and 5 listing images."); return; }
    onSubmit({ pricingType, rateAmount: pricingType === "FREE" ? null : Number(rateAmount), availability: availability.join(","), retainedImageIds: retainedIds, images: uploads });
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onMouseDown={event => { if (event.target === event.currentTarget && !isUpdating) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="edit-listing-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg border border-line bg-surface shadow-xl">
      <header className="flex justify-between border-b border-line p-6"><div><p className="text-xs font-semibold uppercase text-brand">Edit listing</p><h2 id="edit-listing-title" className="mt-1 font-serif text-xl">{listing.listingTitle}</h2></div><button type="button" onClick={onClose} disabled={isUpdating} aria-label="Close"><X className="h-5 w-5" /></button></header>
      <form onSubmit={submit}>
        <fieldset disabled={isUpdating} className="space-y-6 p-6">
          <div><label htmlFor="edit-pricing" className="text-sm font-medium">Pricing</label><select id="edit-pricing" value={pricingType} onChange={event => setPricingType(event.target.value as "PAID" | "FREE")} className="mt-2 w-full rounded-md border border-line p-3"><option value="PAID">Paid</option><option value="FREE">Free</option></select></div>
          {pricingType === "PAID" && <div><label htmlFor="edit-rate" className="text-sm font-medium">Rate amount ({listing.currencyCode})</label><input id="edit-rate" type="number" min="0.01" max="99999999.99" step="0.01" required value={rateAmount} onChange={event => setRateAmount(event.target.value)} className="mt-2 w-full rounded-md border border-line p-3" /></div>}
          <AvailabilityDaysField value={availability} onChange={setAvailability} />
          <div className="space-y-3"><h3 className="text-sm font-medium">Listing images</h3><p className="text-xs text-muted">Keep 1–5 images. Replace an unwanted image or remove it and upload a new one. Images are saved when you click Save changes.</p>
            <div className="grid grid-cols-2 gap-3">{listing.images.map(image => <div key={image.imageId} className={`rounded-md border border-line p-2 ${retainedIds.includes(image.imageId) ? "" : "opacity-50"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.imageUrl.startsWith("http") ? image.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.imageUrl}`} alt="Current listing image" className="h-28 w-full rounded object-cover" />
              <button type="button" className="mt-2 text-sm text-brand underline" onClick={() => setRetainedIds(ids => ids.includes(image.imageId) ? ids.filter(id => id !== image.imageId) : [...ids, image.imageId])}>{retainedIds.includes(image.imageId) ? "Remove" : "Keep image"}</button>
              {retainedIds.includes(image.imageId) && <label className="ml-3 cursor-pointer text-sm text-brand underline">Replace<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={event => { addImages(Array.from(event.target.files ?? []), image.imageId); event.target.value = ""; }} /></label>}
            </div>)}</div>
            {uploads.map((file, index) => <div key={`${index}-${file.name}`} className="flex items-center gap-3"><UploadPreview file={file} /><span className="min-w-0 flex-1 truncate text-sm">{file.name}</span><button type="button" className="text-sm text-brand underline" onClick={() => setUploads(files => files.filter((_, item) => item !== index))}>Remove new image</button></div>)}
            <label className="block text-sm font-medium">Add images<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={event => { addImages(Array.from(event.target.files ?? [])); event.target.value = ""; }} className="mt-2 block w-full text-sm" /></label>
            <p className="text-xs text-muted">{retainedIds.length + uploads.length} of 5 images selected</p>
          </div>
        </fieldset>
        {(validationError || error) && <p role="alert" className="mx-6 mb-4 rounded-md bg-danger-tint p-3 text-sm text-danger">{validationError || error}</p>}
        <footer className="flex justify-end gap-3 border-t border-line p-4"><button type="button" onClick={onClose} disabled={isUpdating} className="rounded-md border border-line px-4 py-2">Cancel</button><button type="submit" disabled={isUpdating} className="rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:opacity-50">{isUpdating ? "Saving…" : "Save changes"}</button></footer>
      </form>
    </div>
  </div>;
}
function UploadPreview({ file }: { file: File }) {
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => { const objectUrl = URL.createObjectURL(file); if (image.current) image.current.src = objectUrl; return () => URL.revokeObjectURL(objectUrl); }, [file]);
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={image} alt="New listing image preview" className="h-14 w-14 rounded object-cover" />;
}
