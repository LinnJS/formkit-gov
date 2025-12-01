import { generateStaticParamsFor, importPage } from 'nextra/pages';

import { useMDXComponents as getMDXComponents } from '../../mdx-components';

const nextraGenerateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateStaticParams() {
  const params = await nextraGenerateStaticParams();
  // Ensure root path is included for static export
  const hasRoot = params.some(p => !p.mdxPath || p.mdxPath.length === 0);
  if (!hasRoot) {
    params.unshift({ mdxPath: [] });
  }
  return params;
}

export async function generateMetadata(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: { params: Promise<{ mdxPath?: string[] }> }) {
  const params = await props.params;
  const { default: MDXContent, toc, metadata, sourceCode } = await importPage(params.mdxPath);

  return (
    <Wrapper metadata={metadata} sourceCode={sourceCode} toc={toc}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
