;<div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
  <div className="flex flex-col gap-6 md:flex-row md:gap-8">
    {/* Image Upload Box */}
    <div className="w-full rounded-lg bg-slate-100 p-4 md:w-1/3 dark:bg-slate-900">
      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image</h3>

      {!imagePreview ? (
        <label className="flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-400 bg-white transition hover:border-slate-500 hover:bg-slate-50/40 dark:border-slate-500 dark:bg-slate-800/40 dark:hover:bg-slate-900">
          <Input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

          <ImagePlus className="text-slate-500 dark:text-slate-400" size={36} />
          <span className="mt-3 text-sm font-medium text-black dark:text-white">
            Click to upload image
          </span>
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            JPG, PNG, GIF • Max 10MB
          </span>
        </label>
      ) : (
        <div className="relative h-60 w-full overflow-hidden rounded-lg border">
          <Button
            variant={'outline'}
            size={'sm'}
            className="absolute top-3 right-0 text-xs hover:bg-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              setImageFile(null) // Reset the selected file
              setImagePreview(null) // Reset the preview
            }}
          >
            Change
          </Button>
          <Image
            src={imagePreview}
            alt="Uploaded Image"
            width={400}
            height={400}
            className="h-full w-full border-2 object-contain"
          />
        </div>
      )}
    </div>

    {/* Content Box */}
    <div className="w-full rounded-lg bg-slate-100 p-4 md:w-2/3 dark:bg-slate-900">
      <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your Content</h3>

      <textarea
        placeholder="Write or paste your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-48 w-full resize-none rounded-md border border-slate-300 bg-white p-3 text-sm ring-slate-500 outline-none focus:ring-1 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-2"
      />

      <span className="text-xs">{content.length} characters</span>
    </div>
  </div>

  {/* Context Box */}
  <div className="mt-10 w-full rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
    <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      Context & Preferences (Optional)
    </h3>

    <textarea
      placeholder="Add brand guidelines, tone preferences, target audience, or specific instructions..."
      className="h-32 w-full resize-none rounded-md border border-slate-300 bg-white p-3 text-sm ring-slate-500 outline-none focus:ring-1 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-2"
    />
  </div>

  {/* Checkbox Selection */}
  <div className="mt-10 w-full rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
    <CheckboxHorizontalGroupDemo />
  </div>

  {/* Generate Button */}
  <div className="mt-10 flex justify-center">
    <Button className="bg-brand-teal hover:bg-brand-teal/90 h-11 w-40 rounded-lg text-white hover:shadow-md">
      Generate Posts
    </Button>
  </div>
</div>
