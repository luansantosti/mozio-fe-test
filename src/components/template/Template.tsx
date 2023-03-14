import * as S from './styles'

interface TemplateProps {
  children: React.ReactElement
}

const Template = ({ children }: TemplateProps) => {
  return (
    <S.Wrapper>
      <S.Content>
        {children}
      </S.Content>
    </S.Wrapper>
  )
}

export default Template
