import ReactGA from 'react-ga'
import { isTest, isProd, isDev } from 'utils/env'

if (!isTest) {
  ReactGA.initialize('UA-55820654-6', {
    titleCase: false,
    gaOptions: { siteSpeedSampleRate: 100 },
  })
}

/**
 * Sends a Google Analytics event
 */
export const logPageView = () => {
  if (isProd) {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
}

/**
 * Generic wrapper for logging events
 * Will print to console in dev, will actually log in prod
 */
const logToGA = (event: { category: string; action: string; label: string }) => {
  if (isDev) {
    console.log(`GA Event: `, event)
  } else if (isProd) {
    ReactGA.event(event)
  }
}

/**
 * Sends a Google Analytics event telling us about a click event
 * @param label
 */
export const logClick = (label: string) => {
  if (label) {
    logToGA({
      category: 'Click',
      action: `Click-${label}`,
      label: 'AoS Battle Plans',
    })
  }
}

/**
 * Sends a Google Analytics event
 * @param event
 */
export const logEvent = (event: string) => {
  if (event) {
    logToGA({
      category: 'Event',
      action: `Event-${event}`,
      label: 'AoS Battle Plans',
    })
  }
}

export const logDisplay = (element: string) => {
  if (element) {
    logToGA({
      category: 'Display',
      action: `Display-${element}`,
      label: 'Display',
    })
  }
}
