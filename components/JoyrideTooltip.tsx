'use client'

import { TooltipRenderProps } from 'react-joyride'

export function JoyrideTooltip({
  index,
  step,
  size,
  isLastStep,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) {

  const handleDone = () => {
    localStorage.setItem('tourCompleted', 'true')  // 👈 set flag
    primaryProps.onClick({
      preventDefault: () => { },
      stopPropagation: () => { },
    } as unknown as React.MouseEvent<HTMLElement>)
  }

  return (
    <div
      {...tooltipProps}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '20px 22px',
        maxWidth: '400px',
        width: '400px',
        boxShadow: '0 16px 48px rgba(0, 252, 117, 0.6)',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Teal top accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #1D9E75, #5DCAA5)',
      }} />

      {/* Step badge + close */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#1D9E75',
          background: 'rgba(29,158,117,0.12)',
          padding: '3px 8px',
          borderRadius: '6px',
          letterSpacing: '0.05em',
        }}>
          STEP {index + 1} OF {size}
        </span>
        <button
          {...closeProps}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-tertiary)',
            fontSize: '24px',
            lineHeight: 1,
            padding: '0 2px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ×
        </button>
      </div>

      {/* Title */}
      {step.title && (
        <p className='font-ai' style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 10px',
          lineHeight: '1.4',
        }}>
          {step.title}
        </p>
      )}

      {/* Content */}
      <div style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        margin: '0 0 20px',
      }}>
        {step.content}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '16px' }}>
        {Array.from({ length: size }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '3px',
              borderRadius: '2px',
              background: i === index ? '#1D9E75' : 'var(--border-medium)',
              width: i === index ? '20px' : '6px',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Skip */}
        <button
          {...skipProps}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            color: 'var(--text-tertiary)',
            padding: 0,
          }}
        >
          Skip tour
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Back */}
          {index > 0 && (
            <button
              {...backProps}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          )}

          {/* Next / Done — 👇 only Done uses handleDone, Next uses primaryProps normally */}
          <button
            {...(isLastStep ? {} : primaryProps)}  // 👈 don't spread primaryProps on Done — we handle it manually
            onClick={isLastStep ? handleDone : primaryProps.onClick}
            style={{
              background: '#1D9E75',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {isLastStep ? 'Done ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
