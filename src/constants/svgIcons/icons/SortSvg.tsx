import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={14} viewBox="0 0 22 14" fill="none" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.441 1.627H21m-8.559 4.815h6.114m-6.114 4.815h3.668M4.806 1v12m0 0L1 9.332M4.806 13l3.95-3.668"
    />
  </Svg>
);
export default SvgComponent;
