import CustomButton from "@/components/ui/button";
import { ContainedDates } from "@/components/ui/inputs/date";
import { ContainedSelect } from "@/components/ui/inputs/select";
import { ContainedInputs } from "@/components/ui/inputs/text";
import { ContainedInputAreas } from "@/components/ui/inputs/textarea";
import { useGetProductsQuery } from "@/redux/api/products";
import { Group, LoadingOverlay } from "@mantine/core";
import { IconChecks } from "@tabler/icons-react";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useCreateRequestMutation } from "@/redux/api/requests";
import { notifications } from "@mantine/notifications";

export default function NewRequest() {
  const { user } = useAuth();
  const [request, setRequest] = useState<{
    user_id: string | number | undefined;
    notes: string;
    product_id: string | number | undefined | null;
    quantity: number;
    unit: string;
    requested_delivery_date: string;
  }>({
    user_id: user?.id,
    notes: "",
    product_id: "",
    quantity: 0,
    unit: "",
    requested_delivery_date: "",
  });
  const { data: products, isLoading: fetchingProducts } = useGetProductsQuery(
    {}
  );
  const [createRequest, { isLoading: creatingRequest }] =
    useCreateRequestMutation();

  return (
    <>
      <LoadingOverlay visible={fetchingProducts} />
      <ContainedSelect
        data={
          products?.data?.map((opt: { name: string; id: number }) => {
            return {
              value: opt?.id?.toString(),
              label: opt?.name,
            };
          }) || []
        }
        mb="sm"
        label="Product"
        placeholder="Enter product name"
        value={request?.product_id?.toString() || ""}
        override
        mutator={(value: string | null) => {
          setRequest((prev) => ({ ...prev, product_id: value || "" }));
        }}
      />
      <ContainedDates
        mb="sm"
        value={
          request?.requested_delivery_date
            ? new Date(request?.requested_delivery_date)
            : undefined
        }
        label="Delivery Date"
        placeholder="Enter delivery date"
        override
        mutator={(value: string | undefined) => {
          console.log(value);

          setRequest((prev) => ({
            ...prev,
            requested_delivery_date: value || "",
          }));
        }}
      />
      <Group grow>
        <ContainedInputs
          value={request?.quantity}
          override
          mutator={(value: string) => {
            setRequest((prev) => ({
              ...prev,
              quantity: parseInt(value) || 0,
            }));
          }}
          mb="sm"
          label="Quantity"
          placeholder="Quantity"
        />
        <ContainedSelect
          value={request?.unit}
          override
          mutator={(value: string | null) => {
            setRequest((prev) => ({ ...prev, unit: value || "" }));
          }}
          data={["PIECE", "KILLOGRAM", "METER"]}
          mb="sm"
          label="Unit"
          placeholder="Unit"
        />
      </Group>
      <ContainedInputAreas
        value={request?.notes}
        override
        mutator={(value: string) => {
          setRequest((prev) => ({ ...prev, notes: value }));
        }}
        minr={4}
        mb="sm"
        label="Notes"
        placeholder="Enter notes"
      />
      <CustomButton
        loading={creatingRequest}
        action={async () => {
          const res = await createRequest(request);
          if (res?.data?.success) {
            notifications.show({
              title: "Success",
              message: "Request published successfully",
              color: "green",
            });
          }
        }}
        ltr
        icon={<IconChecks size={20} />}
        label="PUBLISH REQUEST"
      />
    </>
  );
}
