import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const AnimatedTextHeader = () => {
  const text = 'Welcome Biztechnovations';
  const chars = text.split('');

  const baseColors = ['#019409', '#7630be', '#e1e812ff', '#0055FF']; 
  const highlightColor = 'red';

  const animatedValues = useRef(chars.map(() => new Animated.Value(0))).current;
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const runAnimation = async () => {
      while (isMounted) {
        // Show base color fully for 2 seconds
        await delay(1000);

        // Animate wave highlight one by one slowly
        for (let i = 0; i < chars.length; i++) {
          if (!isMounted) break;
          await new Promise((res) => {
            Animated.timing(animatedValues[i], {
              toValue: 1,
              duration: 100,
              useNativeDriver: false,
            }).start(() => res());
          });
        }

        // Hold wave highlight for 1 second
        await delay(1000);

        // Reset all animated values instantly
        animatedValues.forEach(anim => anim.setValue(0));

        // Switch to next base color
        setColorIndex(prev => (prev + 1) % baseColors.length);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
      animatedValues.forEach(anim => anim.stopAnimation());
    };
  }, [animatedValues, chars.length, baseColors.length]);

  return (
    <View style={styles.container}>
      {chars.map((char, i) => {
        const color = animatedValues[i].interpolate({
          inputRange: [0, 1],
          outputRange: [baseColors[colorIndex], highlightColor],
        });

        return (
          <Animated.Text key={i} style={[styles.text, { color }]}>
            {char}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'nowrap' },
  text: { fontSize: 18, fontWeight: 'bold' },
});

export default AnimatedTextHeader;
