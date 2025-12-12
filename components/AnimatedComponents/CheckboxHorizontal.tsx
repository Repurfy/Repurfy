import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const technologies = ['LinkedIn', 'X (Twitter)', 'Instagram', 'YouTube', 'Pinterest', 'Tik Tok']

const CheckboxHorizontalGroupDemo = () => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">Technologies</Label>

      <div className="flex flex-wrap items-center gap-3">
        {technologies.map((label) => (
          <label
            key={label}
            htmlFor={label}
            className="flex cursor-pointer items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm shadow-sm transition-all select-none hover:bg-slate-50 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <Checkbox id={label} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CheckboxHorizontalGroupDemo
