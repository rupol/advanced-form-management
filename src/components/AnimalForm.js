import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AnimalForm = ({ errors, touched, status }) => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (status) {
      setAnimals([...animals, status]);
    }
  }, [status]);

  return (
    <Form>
      {touched.species && errors.species && (
        <p className="error">{errors.species}</p>
      )}
      <Field type="text" name="species" placeholder="Species (common name)" />
      {touched.age && errors.age && <p className="error">{errors.age}</p>}
      <Field type="number" name="age" placeholder="Age (years)" />
      {touched.diet && errors.diet && <p className="error">{errors.diet}</p>}
      <Field component="select" name="diet">
        <option value="" disabled>
          Select Diet:
        </option>
        <option value="carnivore">Carnivore</option>
        <option value="herbivore">Herbivore</option>
        <option value="omnivore">Omnivore</option>
        <option value="insectivore">Insectivore</option>
        <option value="Detritivore">Detritivore</option>
      </Field>
      {touched.vaccinations && errors.vaccinations && (
        <p className="error">{errors.vaccinations}</p>
      )}
      <label>
        <Field type="checkbox" name="vaccinations" />
        <span>Vaccinations up to date</span>
      </label>
      <Field component="textarea" name="notes" placeholder="Notes"></Field>
      <button type="submit">Submit</button>
      {animals.map(animal => (
        <div key={animal.id}>
          Species: {animal.species}, Diet: {animal.diet}
        </div>
      ))}
    </Form>
  );
};

export default withFormik({
  // values come from Formik automatically
  mapPropsToValues: values => {
    // makes inputs controlled
    return {
      // these keys line up with the "name" attribute on our fields
      species: values.species || "", // empty default
      age: values.age || "",
      diet: values.diet || "",
      vaccinations: values.vaccinations || false,
      notes: values.notes || ""
    };
  },
  validationSchema: Yup.object().shape({
    species: Yup.string().required("Species is required"),
    age: Yup.number().positive(),
    diet: Yup.string().required(
      "Diet is required - select the closest preference"
    ),
    vaccinations: Yup.boolean()
  }),
  handleSubmit: (values, { setStatus }) => {
    axios
      .post("https://reqres.in/api/animals", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  }
})(AnimalForm);
