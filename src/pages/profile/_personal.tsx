import { Badge, Drawer, Table } from "@mantine/core";

export default function Personal({
  opened,
  toggle,
  userProfile,
}: {
  opened: boolean;
  toggle: () => void;
  userProfile: {
    data: {
      first_name: string;
      middle_name: string;
      last_name: string;
      phone_number: string;
      date_of_birth: string;
      gender: string;
      nationality: string;
      kyc_status: string;
      created_at: string;
      fayda_id: string;
    };
  };
}) {
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
            <Table.Td ta="right">{userProfile?.data?.first_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Middle Name
            </Table.Td>
            <Table.Td ta="right">{userProfile?.data?.middle_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Last Name
            </Table.Td>
            <Table.Td ta="right">{userProfile?.data?.last_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Phone Number
            </Table.Td>
            <Table.Td ta="right">
              +251{userProfile?.data?.phone_number.slice(1)}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Date of Birth
            </Table.Td>
            <Table.Td ta="right">{userProfile?.data?.date_of_birth}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Gender
            </Table.Td>
            <Table.Td ta="right">
              {userProfile?.data?.gender &&
                userProfile?.data?.gender?.charAt(0).toUpperCase() +
                  userProfile?.data?.gender?.slice(1)}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Nationality
            </Table.Td>
            <Table.Td ta="right">{userProfile?.data?.nationality}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>
              Customer Since
            </Table.Td>
            <Table.Td ta="right">{userProfile?.data?.created_at}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td style={{ width: "130px", fontWeight: 700 }}>FAN</Table.Td>
            <Table.Td ta="right">{userProfile?.data?.fayda_id}</Table.Td>
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
                  statusColors[
                    userProfile?.data?.kyc_status as keyof typeof statusColors
                  ]
                }
                variant="filled"
              >
                {userProfile?.data?.kyc_status}
              </Badge>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Drawer>
  );
}
