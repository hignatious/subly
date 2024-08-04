import { useState } from "react";
import { Medium } from "../Types";
import { Button } from "./Button";
import { Overlay } from "./Overlay";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en"
import { ProgressBar } from "./ProgressBar";
import { ShowError } from "./ShowError";

// This dependency seemed like a nice way to show the last modified time rather than just putting an iso timestamp in the component.
TimeAgo.addDefaultLocale(en)

interface Props {
  data: Medium;
}

export function Card(props: Props) {
  const timeAgo = new TimeAgo('en')
  const { data } = props;

  const [hover, setHover] = useState(false)

  return (
    <div className="m-4 text-center drop-shadow-lg w-72 h-52 flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <div
        style={data.errorMessage ? {} : { backgroundImage: `url(${data.cover})` }}
        className="h-full flex flex-1"
      >
        {
          // I was going to try to align the buttons to the right as the pdf shows, however it didn't look good with such a terse error message
          data.errorMessage &&
          (
            <Overlay colorStyle="bg-red-100">
              <ShowError showButtons={true}>{data.errorMessage}</ShowError>
            </Overlay>
          )
        }
        {
          // Maybe these components could have been displayed more elegantly however with the hover state being required for one of them
          // I thought this was best. Could also have used a css hover state but I think that would only work while hovering over the image
          // and I wanted it to work when hovering over the whole component.
          data.status === "ready" && hover &&
          (
            <Overlay colorStyle="bg-black/50">
              <Button value="Edit" colorStyles="hover:bg-white/25 text-white border-white" />
            </Overlay>
          )
        }
        {
          data.status === "transcribing" &&
          (
            <Overlay colorStyle="bg-white/70">
              <div className="m-auto w-4/5">
                <p className="text-xs text-gray-700 font-semibold shadow-sm mb-4">Transcribing Subtitles</p>
                <ProgressBar />
              </div>
            </Overlay>
          )
        }

      </div>
      <div className=" bg-white p-4 text-left font-bold capitalize">
        <h1 className="text-sm">{data.name}</h1>
        <h2 className="text-xs text-gray-500">
          {data.status} : <span className="text-gray-400">{timeAgo.format(new Date(data.updatedAt))}</span>
        </h2>
      </div>
    </div>
  )
}