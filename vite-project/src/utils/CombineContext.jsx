// CombineContext takes any number of Provider components as arguments
export default function CombineContext(...Providers) {
  // It returns a new component that accepts children as its props
  return ({ children }) => {
    // Providers.reduceRight wraps the children with providers from right to left
    return Providers.reduceRight((acc, Provider) => {
      // For each Provider, wrap the accumulated children (acc) inside it
      // So it nests Providers like <Provider>...acc...</Provider>
      return <Provider>{acc}</Provider>;
    }, children);
  };
}
/**
 * <A>
  <B>
    <C>
      {children}
    </C>
  </B>
</A>
    * This will return a component that looks like this:
    * <A>
    *  <B>
    *   <C>
    *    {children}
    * </C>
    * </B>
    * 
    * This is useful for combining multiple context providers into a single component
    * that can be used to wrap your application or a part of it, allowing you to
 */