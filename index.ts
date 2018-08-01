import * as React from 'react'
import { Route } from 'react-router-dom'

export interface IProps {
  to: string
  exact?: boolean
  strict?: boolean
  location?: any
  path?: string
  className?: string
  style?: object
  activeStyle?: object
  isActive?: any
  activeClassName?: string
  'aria-current'?: any
}

export default (props: IProps) => {
  const {
    to,
    exact,
    strict,
    location,
    path,
    className,
    activeClassName = 'active',
    style,
    activeStyle,
    isActive: getIsActive,
    'aria-current': ariaCurrent,
    ...rest
  } = props

  const escapedPath = (path: string) => path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")

  return (
    <Route
      path={escapedPath(path)}
      exact={exact}
      strict={strict}
      location={location}
      children={(props) => {
        const { location } = props
        const isActive = exact
          ? location.pathname === to
          : location.pathname.includes(to)

        return (
          <li
            className={
              isActive
                ? [className, activeClassName].filter(i => i).join(" ")
                : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
            aria-current={(isActive && ariaCurrent) || null}
            {...rest}
          />
        )
      }}
    />
  )
}
