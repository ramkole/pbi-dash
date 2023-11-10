"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteTaskSection = ({ taskid }: { taskid: number }) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deletedTask = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/pbi/" + taskid);
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Task </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure ? This action cannot be undone{" "}
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" disabled={isDeleting} onClick={deletedTask}>
                Delete Task {isDeleting && <Spinner />}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>
              This issue could not be deleted.
            </AlertDialog.Description>
            <Button
              variant="soft"
              color="gray"
              mt="2"
              onClick={() => setError(false)}
            >
              Close
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteTaskSection;
