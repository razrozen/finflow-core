import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Mock של קומפוננט פשוט לבדיקה
const TestComponent = () => {
  return (
    <div>
      <h1>FinFlow - מערכת ניהול פיננסי</h1>
      <p>ברוכים הבאים למערכת</p>
      <button>התחל עכשיו</button>
    </div>
  )
}

describe('בדיקות קומפוננטים', () => {
  it('מציג את הכותרת הראשית', () => {
    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    )
    
    expect(screen.getByText('FinFlow - מערכת ניהול פיננסי')).toBeDefined()
    expect(screen.getByText('ברוכים הבאים למערכת')).toBeDefined()
  })

  it('מציג כפתור התחלה', () => {
    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    )
    
    const button = screen.getByText('התחל עכשיו')
    expect(button).toBeDefined()
    expect(button.tagName).toBe('BUTTON')
  })
})
