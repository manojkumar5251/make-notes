import React from "react"
import { Input, Button, Divider, AutoComplete } from "antd"
import { SearchOutlined, PlusOutlined } from "@ant-design/icons"

const TitleList = props => {
  const [options, setOptions] = React.useState([])
  const [data, setData] = React.useState("")

  React.useEffect(() => {
    let notes = []
    props.notes.forEach(item => {
      item.title !== "" && notes.push({ value: item.title })
    })
    setOptions(notes)
  }, [props.notes])

  const onSelect = data => {
    props.onClick(options.findIndex(val => val.value === data))
    setData("")
  }

  const timeCalc = (a, b) => {
    let millisecs = a - new Date(b)
    let days = parseInt((millisecs / (1000 * 60 * 60 * 24)).toFixed(0))
    let hours = parseInt((millisecs / (1000 * 60 * 60)).toFixed(0))
    let mins = parseInt((millisecs / (1000 * 60)).toFixed(0))

    if (days !== 0) {
      millisecs = days + (days === 1 ? " day" : " days")
    } else if (hours !== 0) {
      millisecs = hours + (hours === 1 ? " hour" : " hours")
    } else if (mins !== 0) {
      millisecs = mins + (mins ? " min" : " mins")
    } else millisecs = "moments"

    return millisecs
  }

  return (
    <React.Fragment>
      <div
        style={{ display: "flex", alignItems: "center", padding: "5px 0.5rem" }}
      >
        <AutoComplete
          value={data}
          onChange={setData}
          style={{ width: "100%" }}
          options={options}
          onSelect={onSelect}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input
            size="large"
            prefix={<SearchOutlined />}
            style={{ borderRadius: "50px" }}
          />
        </AutoComplete>

        <Button
          onClick={props.addNewNote}
          type="link"
          style={{ marginLeft: "0.5rem" }}
          icon={
            <PlusOutlined style={{ fontSize: "1.5rem", color: "#7dacd6" }} />
          }
        />
      </div>

      {props.notes.map((item, i) => {
        return (
          <div key={i}>
            <div
              style={{ padding: "0rem 1rem", cursor: "pointer" }}
              onClick={() => props.onClick(i)}
            >
              <h2 style={{ margin: "0rem" }}>{item.title}</h2>
              <h5
                style={{
                  margin: "0rem",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#999"
                }}
              >
                {"Created " + timeCalc(new Date(), item.createdAt) + " ago"}
              </h5>
            </div>
            <Divider style={{ margin: "0.5rem 0rem" }} />
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default TitleList
