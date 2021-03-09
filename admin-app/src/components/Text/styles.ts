import styled from 'styled-components/native';

interface IStyledTextProps {
  fontStyle: 'bold' | 'regular' | 'medium' | 'semiBold';
}

const fontStyle = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
};

export const StyledText = styled.Text<IStyledTextProps>`
  font-family: ${(props) => fontStyle[props.fontStyle]};
`;
