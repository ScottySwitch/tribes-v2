import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Range.module.scss";

export interface MultiRangeProps {
  min?: number;
  max?: number;
  onChange?: ({ min, max }: { min: number; max: number }) => void;
}

const MultiRangeSlider = (props: MultiRangeProps) => {
  const { min = 0, max = 0, onChange } = props;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef<any>(null);
  const maxValRef = useRef<any>(null);
  const range = useRef<any>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange?.({ min: minVal, max: maxVal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal]);

  const handleMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
  };

  const handleMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleMinValue}
        className={classnames(styles.thumb, styles.thumb__zindex_3, {
          [styles.thumb__zindex_5]: minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxValue}
        className={`${styles.thumb} ${styles.thumb__zindex_4}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div ref={range} className={styles.slider__range} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
