import { useAuth } from "@/context/auth";
import { Badge, Drawer, Table } from "@mantine/core";

export default function Personal({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const { user } = useAuth();

  const statusColors = {
    pending: "orange",
    approved: "green",
    rejected: "red",
    null: "orange",
  };

  return (
    <Drawer title="Personal Information" opened={opened} onClose={toggle}>
      <Table withTableBorder withRowBorders withColumnBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              First Name
            </Table.Td>
            <Table.Td ta="right">{user?.first_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Middle Name
            </Table.Td>
            <Table.Td ta="right">{user?.middle_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Last Name
            </Table.Td>
            <Table.Td ta="right">{user?.last_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Phone Number
            </Table.Td>
            <Table.Td ta="right">+251{user?.phone_number.slice(1)}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Date of Birth
            </Table.Td>
            <Table.Td ta="right">{user?.date_of_birth}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Gender
            </Table.Td>
            <Table.Td ta="right">
              {user?.gender &&
                user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1)}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Nationality
            </Table.Td>
            <Table.Td ta="right">{user?.nationality}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Customer Since
            </Table.Td>
            <Table.Td ta="right">{user?.created_at}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>FAN</Table.Td>
            <Table.Td ta="right">{user?.fayda_id}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Status
            </Table.Td>
            <Table.Td ta="right">
              <Badge
                size="md"
                radius="xs"
                color={
                  statusColors[user?.kyc_status as keyof typeof statusColors]
                }
                variant="filled"
              >
                {user?.kyc_status}
              </Badge>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Drawer>
  );
}
