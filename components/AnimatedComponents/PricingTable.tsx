'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

// Import shadcn components
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type FeatureKey =
  | 'websiteNumber'
  | 'premiumSupport'
  | 'database'
  | 'unmeteredBandwidth'
  | 'ssdDisk'
  | 'emailSupport'
  | 'wordpressInstall'
  | 'backupFrequency'
  | 'customDomain'
  | 'serverSpeed'

export type Feature = {
  key: FeatureKey
  label: string
}

export type Plan = {
  id: number
  name: string
  price: number
  isPopular: boolean
  features: Record<FeatureKey, string>
}

const Checkmark = '✓'

const features: { key: FeatureKey; label: string }[] = [
  { key: 'websiteNumber', label: 'Website number' },
  { key: 'premiumSupport', label: 'Premium Support' },
  { key: 'database', label: 'Database' },
  { key: 'unmeteredBandwidth', label: 'Unmetered Bandwidth' },
  { key: 'ssdDisk', label: 'SSD disk' },
  { key: 'emailSupport', label: 'Email Support' },
  { key: 'wordpressInstall', label: 'WordPress Install' },
  { key: 'backupFrequency', label: 'Backup Frequency' },
  { key: 'customDomain', label: 'Custom Domain' },
  { key: 'serverSpeed', label: 'Server speed' },
]

const plans: Plan[] = [
  {
    id: 1,
    name: 'Basic',
    price: 99,
    isPopular: false,
    features: {
      websiteNumber: '10',
      premiumSupport: '12 Month',
      database: Checkmark,
      unmeteredBandwidth: Checkmark,
      ssdDisk: Checkmark,
      emailSupport: '-',
      wordpressInstall: '-',
      backupFrequency: '-',
      customDomain: '-',
      serverSpeed: 'Get Started', // Special case for button
    },
  },
  {
    id: 2,
    name: 'Standard',
    price: 129,
    isPopular: false,
    features: {
      websiteNumber: '50',
      premiumSupport: '12 Month',
      database: Checkmark,
      unmeteredBandwidth: Checkmark,
      ssdDisk: Checkmark,
      emailSupport: Checkmark,
      wordpressInstall: '-',
      backupFrequency: '-',
      customDomain: '-',
      serverSpeed: 'Get Started',
    },
  },
  {
    id: 3,
    name: 'Standard Pro', // Renamed from second 'Standard'
    price: 199,
    isPopular: false,
    features: {
      websiteNumber: '50',
      premiumSupport: '12 Month',
      database: Checkmark,
      unmeteredBandwidth: Checkmark,
      ssdDisk: Checkmark,
      emailSupport: Checkmark,
      wordpressInstall: Checkmark,
      backupFrequency: '-',
      customDomain: '-',
      serverSpeed: 'Get Started',
    },
  },
]

// Helper component for the checkmark/cross icon
const FeatureIcon = ({ value }: { value: string }) => {
  if (value === '✓') {
    return <Check className="h-4 w-4 text-green-500" />
  }
  if (value === '-') {
    return <X className="h-4 w-4 text-gray-400" />
  }
  return <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>
}

const PricingSection = () => {
  const isServerSpeedRow = (key: FeatureKey) => key === 'serverSpeed'

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose your right plan!
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            Explore Our Plans and Choose the One That Best Fits Your Needs and Budget !
          </p>
        </div>

        {/* Pricing Table Wrapper */}
        <div className="mt-12 overflow-x-auto rounded-lg border">
          <Table className="min-w-[800px] border-collapse">
            {/* Table Header with Framer Motion */}
            <TableHeader>
              <TableRow className="border-b-0">
                <TableHead className="w-[180px] border-r border-b-0"></TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.id}
                    className="border-r p-0 first:border-l-0 last:border-r-0"
                  >
                    <motion.div
                      className="flex h-36 flex-col items-center justify-center p-4 text-center transition-colors duration-300"
                      initial={false}
                      whileHover={{
                        scale: plan.isPopular ? 1 : 1.03,
                        boxShadow: plan.isPopular
                          ? '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                          : '0 5px 10px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
                      }}
                      animate={{
                        backgroundColor: plan.isPopular
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--background))',
                        color: plan.isPopular
                          ? 'hsl(var(--primary-foreground))'
                          : 'hsl(var(--foreground))',
                      }}
                    >
                      {/* Plan Name */}
                      <div className="text-lg font-semibold">{plan.name}</div>
                      {/* Price */}
                      <div className="mt-2 text-4xl font-bold">${plan.price}</div>
                      {/* Per Month Text */}
                      <div className="text-sm opacity-80">Per month</div>
                    </motion.div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body with Features */}
            <TableBody>
              {features.map((feature) => (
                <TableRow
                  key={feature.key}
                  className="group transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* Feature Label Column */}
                  <TableCell className="sticky left-0 bg-white font-medium group-hover:bg-gray-50 dark:bg-gray-950 dark:group-hover:bg-gray-800">
                    {feature.label}
                  </TableCell>

                  {/* Feature Values for Each Plan */}
                  {plans.map((plan) => {
                    const value = plan.features[feature.key]

                    if (isServerSpeedRow(feature.key)) {
                      // Render Button Row
                      return (
                        <TableCell key={plan.id} className="text-center">
                          <Button
                            className="w-full text-base transition-transform duration-300"
                            variant={plan.isPopular ? 'default' : 'outline'}
                            asChild
                          >
                            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                              {value}
                            </motion.span>
                          </Button>
                        </TableCell>
                      )
                    }

                    // Render standard Feature Cell
                    return (
                      <TableCell
                        key={plan.id}
                        className="text-center font-normal"
                        style={{
                          backgroundColor: plan.isPopular
                            ? 'hsl(var(--primary) / 0.05)'
                            : undefined,
                          color: plan.isPopular ? 'hsl(var(--primary))' : undefined,
                        }}
                      >
                        <FeatureIcon value={value} />
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
