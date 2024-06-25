/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FETCH_LOCATION_LIST } from "../utility Functions/fetch_countries";
import styles from "./postadoption.module.css";
import classNames from "classnames/bind";
import { OptsValue } from "./PostAdoption";

const cx = classNames.bind(styles);

interface AsyncInputProps {
  type: "country" | "state" | "city";
  countryId?: string;
  stateId?: string;
  onChange: (value: OptsValue) => void;
}

const map = {
  country: "country",
  state: "state",
  city: "state",
};

const AsyncInput = ({
  type,
  countryId,
  stateId,
  onChange,
}: AsyncInputProps) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (type === "country") {
        const countries = await FETCH_LOCATION_LIST();
        setOptions(countries.response);
      } else if (type === "state" && countryId) {
        const states = await FETCH_LOCATION_LIST(countryId);
        setOptions(states.response || []);
      } else if (type === "city" && countryId && stateId) {
        const cities = await FETCH_LOCATION_LIST(countryId, stateId);
        setOptions(cities.response || []);
      }
    };
    fetchData();
  }, [type, countryId, stateId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.options[event.target.selectedIndex].text;
    setValue(event.target.value);
    onChange({ id: event.target.value, name: selectedLabel });
  };

  return (
    <div>
      <select
        value={value}
        onChange={handleChange}
        className={cx("inputField")}
      >
        <option value="" className={cx("optionContainer")}>
          Select {type}
        </option>
        {Array.isArray(options) &&
          options.map((option: any) => (
            <option
              key={option[map[type] + "Id"]}
              value={option[map[type] + "Id"]}
              className={cx("optionContainer")}
            >
              {option[map[type] + "Name"]}
            </option>
          ))}
      </select>
    </div>
  );
};

export default AsyncInput;
