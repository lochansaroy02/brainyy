import { useRef } from "react";
import { useShareLinkStore } from "../utils/store";
import { Button } from "./ui/Button";

const ShareLink = () => {

    const { link } = useShareLinkStore();
    const ref = useRef(null)

    return (
        <div className="absolute top-10 z-10 bg-neutral-400/60 backdrop-blur-md border-gray-700 rounded-md ">
            <div className="flex flex-col gap-2 p-4  ">
                <p className="text-sm text-gray-500">Share this link with your friends to access your content.</p>
                <div className="flex items-center gap-2">
                    <input
                        ref={ref}
                        type="text"
                        value={`https://example.com/${link}`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <Button variant="secondary" size="sm" text="copy" />
                </div>
            </div>

        </div>
    )
}

export default ShareLink;
