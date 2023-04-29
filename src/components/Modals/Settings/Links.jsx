import {
  HStack,
  Link,
  useColorModeValue,
  Text,
  VStack,
} from "@chakra-ui/react";

const Links = ({ ...props }) => {
  const linkColor = useColorModeValue("#818692", "#c3c7e0");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const links = [
    {
      id: "about",
      title: "About",
      urlCaption: "Twitter",
      url: "https://twitter.com/marsidev",
    },
    {
      id: "source-code",
      title: "Source code",
      urlCaption: "GitHub",
      url: "https://github.com/marsidev/wordly",
    },
  ];

  return (
    <VStack {...props}>
      {links.map((link) => {
        const { id, title, url, urlCaption } = link;

        return (
          <HStack
            key={id}
            align="center"
            borderBottom="1px solid"
            borderColor={borderColor}
            justify="space-between"
            minH="75px"
            minW={["300px", "500px"]}
            px={4}
            w="100%"
          >
            <Text fontWeight={600}>{title}</Text>

            <span>
              <Link
                isExternal
                color={linkColor}
                fontSize={16}
                href={url}
                textDecoration="underline"
              >
                {urlCaption}
              </Link>
            </span>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default Links;
