import { Drawer, Accordion } from "@mantine/core";

export default function FAQ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const faqs = [
    {
      emoji: "💰",
      value: "What is Supply Chain Financing?",
      description:
        "Supply Chain Financing is a platform provided by our bank that enables businesses to optimize their working capital by unlocking cash from their supply chain. It allows buyers to pay suppliers early while enjoying extended payment terms.",
    },
    {
      emoji: "📈",
      value: "How does Supply Chain Financing work?",
      description:
        "Our platform automates the entire invoice financing process, from uploading invoices to receiving payments. Suppliers can upload their invoices, and buyers can review and approve them for payment.",
    },
    {
      emoji: "🤝",
      value: "What are the benefits of Supply Chain Financing?",
      description:
        "Supply Chain Financing provides businesses with improved cash flow, reduced costs, and stronger relationships with their suppliers. It also allows buyers to benefit from extended payment terms without affecting the payment terms of their suppliers.",
    },
  ];

  const items = faqs.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <Drawer title="Frequently Asked Questions" opened={opened} onClose={toggle}>
      <Accordion variant="separated" defaultValue="Apples">
        {items}
      </Accordion>
    </Drawer>
  );
}
