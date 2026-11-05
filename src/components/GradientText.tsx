import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  TSpan,
} from 'react-native-svg';

interface GradientTextProps {
  text: string;
  prefix?: string;
  prefixColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  colors?: [string, string, ...string[]];
  height?: number;
  width?: number;
  letterSpacing?: number;
  style?: ViewStyle;
}

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  prefix,
  prefixColor = '#FFFFFF',
  fontSize = 20,
  fontWeight = '700',
  colors = ['#38BDF8', '#7DD3FC'],
  height,
  width = 280,
  letterSpacing = 0,
  style,
}) => {
  const calculatedHeight = height || fontSize * 1.35;
  const gradId = `grad_${Math.random().toString(36).substring(2, 9)}`;

  return (
    <View style={[{ height: calculatedHeight, width }, style]}>
      <Svg height={calculatedHeight} width={width}>
        <Defs>
          <SvgLinearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors[0]} />
            <Stop offset="100%" stopColor={colors[colors.length - 1]} />
          </SvgLinearGradient>
        </Defs>
        <SvgText
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          x="0"
          y={fontSize * 0.95}
        >
          {prefix ? (
            <TSpan fill={prefixColor}>{prefix}</TSpan>
          ) : null}
          <TSpan fill={`url(#${gradId})`}>{text}</TSpan>
        </SvgText>
      </Svg>
    </View>
  );
};

export default GradientText;

