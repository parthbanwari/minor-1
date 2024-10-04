import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { LANGUAGE_VERSION } from '../../constants';

const languages = Object.entries(LANGUAGE_VERSION);
const ACTIVE_COLOR = "#ba9bf7"

const Language = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize='lg' color='#c0cbf4'>Select Language</Text>
      <Menu isLazy>
        <MenuButton 
          as={Button} 
          backgroundColor="#ff757f" 
          color="black" 
          _hover={{ backgroundColor: '#c7606d' }}
          _active={{ backgroundColor: '#c7606d' }} 
        >
          {language}
        </MenuButton>
        <MenuList bg='#ff757f'>
          {
            languages.map(([lang, version]) => (
              <MenuItem key={lang} 
                color={
                  lang == language ? "#ba9bf7" : ""
                }
                bg={
                  lang == language ? "#c7606d" : ""
                }
                _hover={{
                 color : ACTIVE_COLOR,
                 bg : "#ba9bf7"
                }}
              onClick={() => onSelect(lang)}>
                <Text as="span" color="black"> {/* Set the color for the MenuItem text */}
                  {lang}
                  &nbsp;
                  <Text as="span" color="gray.600" fontSize="sm">
                    ({version})
                  </Text>
                </Text>
              </MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Language;
