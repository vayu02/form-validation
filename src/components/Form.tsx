import { useEffect, useMemo, useState } from "react";
import { countries } from "countries-list";
import { AddrTypes } from "../../index";

const Form = ({ line1, line2, country, postCode }: AddrTypes) => {
  const postalCodeRegex =
    /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

  const [formData, setFormData] = useState({
    line1: "",
    line2: "",
    country: "",
    postCode: "",
  });
  const [errMsg, setErrMsg] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allCountries: string[] = useMemo(() => {
    return Object.values(countries).map((country) => country.name);
  }, []);

  allCountries[0] = countries.GB.name;
  allCountries[1] = countries.FR.name;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg(validateForm(formData));
    setSubmitted(true);
    console.log(formData);
    setFormData({
      line1: "",
      line2: "",
      country: "",
      postCode: "",
    });
  };

  const validateForm = (data: any) => {
    const errors: any = {};
    if (!data.line1) {
      errors.line1 = "Address is Required";
    }
    if (!data.country) {
      errors.country = "Please select a country";
    }
    if (!data.postCode) {
      errors.postCode = "Please enter postcode";
    } else if (
      formData.country &&
      country === "Great Britain" &&
      !postalCodeRegex.test(data.postCode)
    ) {
      errors.postCode = "Invalid postcode format";
    }
    return errors;
  };

  useEffect(() => {
    if (line1 || (line2 && country && postCode)) {
      setFormData({ ...formData, line1, line2, country, postCode });
    }
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Address</h2>
      <p style={{ color: "red", fontSize: "10px", textAlign: "center" }}>
        {errMsg.line1 || errMsg.postCode || errMsg.country}
      </p>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="line1">Line 1</label>
          <input
            type="text"
            value={formData.line1}
            onChange={handleChange}
            name="line1"
            id="line1"
          />
        </div>
        {formData.country === "France" ? (
          <></>
        ) : (
          <div>
            <label htmlFor="line2">Line 2</label>
            <input
              type="text"
              value={formData.line2}
              onChange={handleChange}
              name="line2"
              id="line2"
            />
          </div>
        )}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="country">Country</label>
            <select
              className="dropdown"
              name="country"
              value={formData.country}
              onChange={handleChange}
              id="country"
            >
              {allCountries.map((country, id) => (
                <option key={id} value={country} className="country">
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="postCode">Post Code</label>
          <input
            type="text"
            value={formData.postCode}
            onChange={handleChange}
            name="postCode"
            id="postCode"
            style={{ width: "100px" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
