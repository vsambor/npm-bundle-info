import React from 'react'
import './AppFooter.css'

/**
 * Renders the main page footer.
 */
function AppFooter() {
  return (
    <footer className="app-footer">
      {(new Date()).getFullYear()} © Bundle Info. All rights reserved.
    </footer>
  )
}

export default AppFooter
