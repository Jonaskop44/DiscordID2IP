import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: FC<ModalProps> = ({ open, setOpen }) => {
  const [ip, setIp] = useState("");

  useEffect(() => {
    const getIP = async () => {
      await axios
        .get("api/ip")
        .then((response) => {
          setIp(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getIP();
  }, []);

  const handelCopy = () => {
    navigator.clipboard.writeText(ip);
    toast.success("IP copied to clipboard");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-[#2c2f33] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <FaMapLocationDot
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-white"
                  >
                    IP of the target
                  </Dialog.Title>
                  <div className="mt-2">
                    <p
                      onClick={() => handelCopy()}
                      title="Click to copy"
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {ip}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#7289da] text-base font-medium text-white sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    handelCopy();
                  }}
                >
                  Close and copy IP
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
