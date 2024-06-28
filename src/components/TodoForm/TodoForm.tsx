import { Button, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { ITodo } from "../../data-scructures/ITodo";

interface ITodoForm {
  initialValues: Omit<ITodo, "id" | "status">;
  innerRef?: any;
  onSubmit: (newTodo: Omit<ITodo, "id" | "status">, actions: any) => void;
  showSubmitButton?: boolean;
  showLabel?: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string(),
  deadline: Yup.date(),
});

const TodoForm: React.FC<ITodoForm> = ({
  initialValues,
  innerRef,
  onSubmit,
  showSubmitButton = true,
  showLabel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={innerRef}
      onSubmit={onSubmit}
    >
      <Form>
        <Field name={"title"}>
          {({ field, _form, meta }: any) => (
            <FormItem
              label={showLabel && "Title"}
              validateStatus={meta.touched && meta.error ? "error" : "success"}
              help={meta.error}
              required={true}
              layout={"vertical"}
            >
              <Input {...field} />
            </FormItem>
          )}
        </Field>
        <Field name={"description"}>
          {({ field, _form, meta }: any) => (
            <FormItem
              label={showLabel && "Description"}
              validateStatus={meta.touched && meta.error ? "error" : "success"}
              help={meta.error}
              layout={"vertical"}
            >
              <TextArea {...field} />
            </FormItem>
          )}
        </Field>
        <Field name={"deadline"} type={"date"}>
          {({ field, _form, meta }: any) => (
            <FormItem
              label={showLabel && "Deadline"}
              validateStatus={meta.touched && meta.error ? "error" : "success"}
              help={meta.error}
              layout={"vertical"}
            >
              <Input {...field} type={"date"} />
            </FormItem>
          )}
        </Field>
        {showSubmitButton && (
          <FormItem>
            <Button htmlType={"submit"} type={"primary"}>
              {"Add"}
            </Button>
          </FormItem>
        )}
      </Form>
    </Formik>
  );
};

export { TodoForm };
