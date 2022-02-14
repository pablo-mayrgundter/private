import React, {useEffect} from 'react'
import {
  Outlet,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Share from './Share'
import debug from './utils/debug'

// TODO: This isn't used.
// If icons-material isn't imported somewhere, mui dies
/* eslint-disable */
import AccountCircle from '@mui/icons-material/AccountCircle'
/* eslint-enable */

/**
 * From URL design: https://github.com/buildrs/Share/wiki/URL-Structure
 * ... We adopt a URL structure similar to Google Apps URL structure:
 *
 *   http://host/<app>/<view>/<object>
 *
 * which when fully expanded becomes:
 *
 *   http://host/share/v/p/haus.ifc
 *   http://host/share/v/gh/buildrs/Share/main/public/haus.ifc
 *
 * @param {testElt} For unit test allow use of a stub here instead of loading the app.
 * @return {Object}
 */
export default function BaseRoutes({testElt = null}) {
  const location = useLocation(); const navigate = useNavigate()
  const installPrefix = window.location.pathname.startsWith('/Share') ? '/Share' : ''

  useEffect(() => {
    const referrer = document.referrer
    if (referrer) {
      const path = new URL(document.referrer).pathname
      if (path.length > 1) {
        navigate(path)
      }
    }
    if (location.pathname === installPrefix ||
        location.pathname === (installPrefix + '/')) {
      debug().log('BaseRoutes: forwarding to: ', installPrefix + '/share')
      navigate(installPrefix + '/share')
    }
  }, [])

  const basePath = installPrefix + '/*'
  return (
    <Routes>
      <Route path={basePath} element={<Outlet/>}>
        <Route path="share/*"
          element={
            testElt || <Share installPrefix={installPrefix}
              appPrefix={installPrefix + '/share'} />
          }/>
      </Route>
    </Routes>
  )
}