import { VStack } from "@chakra-ui/react";
import FormItem from "../components/FormItem";

const FormListView = ({ forms, handleFormDetailView, openForm, compLoading, setCompLoading }) => {
  return (
    <VStack width="100%" p={4}>
      {forms.map((form) => (
        <FormItem
          key={form.key}
          data={form}
          handleFormDetailView={handleFormDetailView}
          isOpen={form.key === openForm}
          compLoading={compLoading}
          setCompLoading={setCompLoading}
        />
      ))}
    </VStack>
  );
};

export default FormListView;
