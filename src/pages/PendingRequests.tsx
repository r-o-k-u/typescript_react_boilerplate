import React from "react";
import Table from "../components/table";

export default class Pending extends React.Component {
  render() {
    return (
      <>
        <div className="">
          <div className="mt-3 border-0 card shado mx-3 shadow">
            <div className="text-center">
              <h4 className="font-weight-bold">Table Sample</h4>
            </div>
            <div className="mt-3 align-items-center">
              <p>Search parameters go here</p>
            </div>
          </div>

          <div className="mt-3 table-card  border-0 card shado mx-3 shadow">
            <div className="p-4">
              <Table
                search={["name"]}
                sort="id"
                sortDirection={-1}
                data={[
                  {
                    name: "john",
                  },
                  {
                    name: "john",
                  },
                  ,
                  {
                    name: "tom",
                  },
                ]}
                fetch={({}) => {
                  this.setState({ query: {} });
                }}
                loading={false}
                fetchError={() => {}}
                status=""
                checkbox=""
                hasPdf="false"
                titles=""
                count={0}
                checked={[]}
                getChecked={() => {}}
              ></Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
