import { useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { PasswordInput, Progress, Text, Popover, Box } from "@mantine/core";
import { requirements, getStrength } from "../utils/functions";

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

function Password({ value, setValue, label, visible, toggle }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: "pop" }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label={label}
              placeholder="**********"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              visible={visible}
              size="lg"
              onVisibilityChange={toggle}
              classNames={{
                input: "border border-gray-400 p-2 w-full rounded",
              }}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={value.length > 5}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </>
  );
}

export default Password;
