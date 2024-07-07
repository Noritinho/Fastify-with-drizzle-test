export function wrapControllerMethods(controller: any) {
  const wrappedController: Record<string, any> = {};
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(controller))) {
    if (typeof controller[key] === 'function' && key !== 'constructor') {
      wrappedController[key] = controller[key].bind(controller);
    }
  }
  return wrappedController;
}