import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-2">{children}</h2>
    ),
    p: ({ children }) => <p className="mb-2 text-justify">{children}</p>,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    ul: ({ children }) => <ul className="list-disc pl-4 mb-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-4 mb-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-2">{children}</li>,
    // Custom component for nested list items with indentation
    nestedLi: ({ children }) => <li className="ml-4 mb-2">{children}</li>,
    ...components,
  };
}
