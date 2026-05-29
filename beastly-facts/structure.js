import SplitPreview from '../src/components/SplitPreview'

export const defaultDocumentNode = (S, { schemaType }) => {
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      S.view.component(SplitPreview).title('Split Preview'),
    ])
  }
  return S.document().views([S.view.form()])
}