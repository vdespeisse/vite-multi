import { RouteLocationNormalized } from 'vue-router'


export function getRouteOption(route: RouteLocationNormalized, key: string) {
  return route.matched.reduce((acc, m) => {
    return Object.values(m.components).reduce(
      // TODO: get rid of typescript error (extend interface IDK)
      (acc, component) => component && component[key],
      null
    )
  }, null)
}