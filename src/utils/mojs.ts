// @ts-ignore
// This package dosn't have a type definition
import mojs from '@mojs/core';

export const burst = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 0: 30 },
  angle: 'rand(0, 360)',
  children: {
    shape: 'line',
    stroke: '#ECF87F',
    fill: 'none',
    scale: 1,
    scaleX: { 1: 0 },
    easing: 'cubic.out',
    duration: 1000
  }
});

export const bubbles = new mojs.Burst({
  left: 0,
  top: 0,
  radius: 28,
  count: 3,
  timeline: { delay: 100 },
  children: {
    stroke: '#FF75D8',
    fill: 'none',
    scale: 1,
    strokeWidth: { 8: 0 },
    radius: { 0 : 'rand(6, 10)' },
    degreeShift: 'rand(-50, 50)',
    duration: 400,
    delay: 'rand(0, 250)',
  }
});

export function playCheckedEffect(position: { x: number, y: number }): void {
  burst.tune(position).generate().replay();
  bubbles.tune(position).generate().replay();
}


