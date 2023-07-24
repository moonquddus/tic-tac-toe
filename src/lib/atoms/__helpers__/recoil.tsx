import { render } from '@testing-library/react'
import { ReactElement, useEffect } from 'react'
import { RecoilRoot, RecoilValue, useRecoilValue } from 'recoil'

export function renderWithRecoil(ui: ReactElement){
  return render(
    <RecoilRoot>
      {ui}
    </RecoilRoot>
  )
}

type RecoilObserverPayload<T> = {
  node: RecoilValue<T>
  onChange: (value: T) => void
}
export function RecoilObserver<T>({node, onChange}: RecoilObserverPayload<T>) {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
