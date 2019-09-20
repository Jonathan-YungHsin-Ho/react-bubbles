import React, { useState, useEffect } from 'react';
import { Pack } from '@potion/layout';
import { Svg, Circle, Rect } from '@potion/element';

const Bubbles = ({ colors }) => {
  const [blocks, setBlocks] = useState(false);

  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`,
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  const handleToggle = () => {
    setBlocks(!blocks);
  };

  return (
    <div className='bubble-wrap'>
      {blocks && <p>blocks</p>}
      {!blocks && <p>bubbles</p>}
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData,
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          // animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  if (blocks) {
                    return (
                      <Rect
                        x={x}
                        y={y}
                        width={x * Math.random()}
                        height={y * Math.random()}
                        fill={colors[i].code.hex}
                      />
                    );
                  } else {
                    return (
                      <Circle
                        key={key}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={colors[i].code.hex}
                      />
                    );
                  }

                  // return (
                  //   <Circle
                  //     key={key}
                  //     cx={x}
                  //     cy={y}
                  //     r={r}
                  //     fill={colors[i].code.hex}
                  //   />
                  //   <Rect
                  //     x={x}
                  //     y={y}
                  //     width={x * Math.random()}
                  //     height={y * Math.random()}
                  //     fill={colors[i].code.hex}
                  //   />
                  // );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
      <button className='btn-toggle' onClick={handleToggle}>
        toggle display
      </button>
    </div>
  );
};

export default Bubbles;
