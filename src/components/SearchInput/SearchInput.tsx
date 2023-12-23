import { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';

// Libs
import Input from 'antd/es/input';

// Type definitions
import { InputProps } from 'antd/es/input/Input';

type SearchInputType = InputProps & {
  value: string;
  onChangeEvent: (newValue: string) => void;
};

const SearchInput: FC<SearchInputType> = props => {
  const { onChangeEvent, value, ...rest } = props;

  // State
  const [timedQuery, setTimedQuery] = useState(value);
  const [endedQuery, setEndedQuery] = useState(value);

  // Effects
  useEffect(() => {
    const timeoutId = setTimeout(setEndedQuery, 500, timedQuery);
    return () => clearTimeout(timeoutId);
  }, [timedQuery]);

  useEffect(() => {
    if (value === endedQuery) {
      return;
    }
    onChangeEvent(endedQuery);
  }, [endedQuery, onChangeEvent]); // eslint-disable-line

  // Handlers
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTimedQuery(event.target.value);
  }, []);

  return (
    <Input
      {...rest}
      type="text"
      size="large"
      value={timedQuery}
      placeholder="Write character's name"
      onChange={handleChange}
      allowClear
    />
  );
};

export default SearchInput;
