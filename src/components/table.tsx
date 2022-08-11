import { Component } from "react";
import {
  Search,
  Slash,
  Download,
  Settings,
  File,
  CheckCircle,
} from "react-feather";
import Modal from "./modal";
import { Parser } from "json2csv";
import Utilities from "../utils/utiles";
import { FALSE } from "node-sass";

type AppProps = {
  sort: string;
  sortDirection: any;
  search: any;
  loading: Boolean;
  status: any;
  checkbox: any;
  hasPdf: any;
  checked: any[];
  titles: String;
  count: Number;
  fetch: any;
  data: any[];
  getChecked: Function;
  fetchError: Function;
};
class Table extends Component<AppProps> {
  // eslint-disable-next-line
  path = window.location.pathname.split("/")[1];

  state = {
    titles: [],
    data: [],
    limit: 10,
    offset: 0,
    count: 1,
    currentPagination: 0,
    custom: false,
    customText: "",
    tableLoading: true,
    sort: this.props.sort ? this.props.sort : "id",
    sortDirection: this.props.sortDirection ? this.props.sortDirection : -1,
    search: this.props.search,
    searchEnabled: false,
    pdf_email: "",
    searchValue: "",
    loading: this.props.loading,
    csv_file_name:
      this.path.indexOf("View") === -1
        ? this.path
        : window.location.pathname.split("/")[2],
    pdf_file_name:
      this.path.indexOf("View") === -1
        ? this.path
        : window.location.pathname.split("/")[2],
    CSVmodal: false,
    PDFmodal: false,
    generating: false,
    generateComplete: false,
    csvMode: false,
    PDFURI: "",
    CSVURI: "",
    PDFMode: false,
    checkbox: this.props.checkbox,
    hasPdf: this.props.hasPdf,
    checked: this.props.checked,
    checkAll: false,
    checkboxIDS: [],
  };
  render() {
    return (
      <>
        <div className={"d-flex flex-fill flex-column "}>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            {this.props.search && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.setState({
                    searchEnabled: true,
                  });
                  setTimeout(() => {
                    this.fetchTable();
                  }, 0);
                }}
                className="d-flex flex-column justify-content-center position-relative"
              >
                <Search
                  className="search-icon cursor-pointer"
                  color="grey"
                  onClick={() => {
                    this.setState({
                      searchEnabled: true,
                    });
                    setTimeout(() => {
                      this.fetchTable();
                    }, 0);
                  }}
                />
                <input
                  type="search"
                  className="form-control pl-5 rounded bg-light"
                  value={this.state.searchValue}
                  placeholder="search"
                  onChange={(e) => {
                    this.setState({ searchValue: e.target.value });
                  }}
                />
              </form>
            )}

            <div className="d-flex flex-row align-items-center">
              {this.state.hasPdf ? (
                <button
                  onClick={() => {
                    this.setState({ PDFmodal: true });
                  }}
                  className="option-card pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round btn-sm mr-3"
                >
                  <Download size={16} />
                  <span className="pl-2 font-weight-bold no-wrap">
                    Generate PDF
                  </span>
                </button>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  this.setState({ CSVmodal: true });
                }}
                className="option-card pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round btn-sm mr-3"
              >
                <Download size={16} />
                <span className="pl-2 font-weight-bold no-wrap">
                  Generate Excel
                </span>
              </button>

              <span className="mr-2">Show </span>
              <select
                className="form-control form-control-sm"
                onChange={(event) => {
                  this.setState({ limit: parseInt(event.target.value) });
                  setTimeout(() => {
                    this.fetchTable();
                  }, 100);
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={1000000000}>All</option>
              </select>
              <span className="ml-2"> entries </span>
            </div>
          </div>

          <div className="d-flex flex-fill tb-cover position-relative">
            {this.state.loading && (
              <div className="loader h-100 w-100 d-flex flex-row align-items-center justify-content-center show-loader ">
                <div className="lds-roller">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            )}

            {!this.state.loading && !this.state.data.length && (
              <div className="w-100 h-100 empty-holder bg-light d-flex flex-row align-items-center justify-content-center">
                <div className="text-muted d-flex flex-column align-items-center">
                  <Slash size={30} />
                  <span className="mt-3">No Data</span>
                </div>
              </div>
            )}
            <div className="table-container w-100">
              <table className="table table-striped text-dark table-hover">
                <thead>
                  <tr>
                    {this.state.checkbox && (
                      <th className="">
                        <input
                          type="checkbox"
                          className="styled-checkbox"
                          name=""
                          id="index"
                          checked={this.state.checkboxIDS.every((val) =>
                            this.state.checked.includes(val)
                          )}
                          onChange={this.checkAll}
                        />
                        <label htmlFor="index"></label>
                      </th>
                    )}
                    {this.state.titles.map(
                      (title: String, i) =>
                        title !== "hidden" && (
                          <th
                            key={i}
                            className="text-capitalize"
                            onClick={() => {
                              this.setState({
                                sort: title,
                                sortDirection:
                                  this.state.sortDirection === -1 ? 1 : -1,
                              });

                              setTimeout(() => {
                                this.fetchTable();
                              }, 0);
                            }}
                          >
                            {title.replace(/_/g, " ")}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((data, index) => (
                    <tr key={index} className="cursor-pointer">
                      {this.state.checkbox && (
                        <td className="">
                          {/*  <input
                            type="checkbox"
                            className="styled-checkbox"
                            name=""
                            id={index.toString()}
                            checked={
                              this.state.checked.indexOf(data.hidden.id) !== -1
                                ? true
                                : false
                            }
                            onChange={() => this.toggleCheckbox(data.hidden.id)}
                          /> */}
                          <label htmlFor={index.toString()}></label>
                        </td>
                      )}
                      {Object.keys(data).map((d, i) => {
                        if (d === "hidden") return false;
                        let o =
                          data[d] === null || data[d] === "" ? " - " : data[d];
                        if (typeof o == "object") {
                          if (o /* && o.$$typeof */) {
                          } else {
                            o = "-";
                          }
                        }
                        return (
                          <td key={i} className="table-data">
                            {o}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-md-flex flex-row justify-content-between align-items-center mt-3">
            <div className="d-flex flex-row align-items-center">
              <span className="mr-2 mb-3">
                Showing {this.state.offset} to{" "}
                {typeof this.state.offset !== "undefined" &&
                  (this.state.offset + this.state.limit).toLocaleString()}{" "}
                of{" "}
                {typeof this.state.count !== "undefined" &&
                  this.state.count.toLocaleString()}{" "}
                entries{" "}
              </span>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.setState({ offset: 0, currentPagination: 0 });
                        setTimeout(() => {
                          this.fetchTable();
                        }, 100);
                      }}
                    >
                      &laquo;
                    </button>
                  </li>
                  <li
                    className="page-item"
                    onClick={() => {
                      if (this.state.currentPagination - 1 >= 0) {
                        this.setState({
                          offset:
                            (this.state.currentPagination - 1) *
                            this.state.offset,
                          currentPagination: this.state.currentPagination - 1,
                        });
                      }
                      setTimeout(() => {
                        this.fetchTable();
                      }, 100);
                    }}
                  >
                    <button className="page-link">&lt;</button>
                  </li>

                  {this.generatePagination()}

                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        if (
                          this.state.currentPagination + 1 <
                          this.state.count / this.state.limit
                        ) {
                          this.setState({
                            offset:
                              (this.state.currentPagination + 1) *
                              this.state.limit,
                            currentPagination: this.state.currentPagination + 1,
                          });
                          setTimeout(() => {
                            this.fetchTable();
                          }, 100);
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.setState({
                          offset: this.state.count - this.state.limit,
                          currentPagination:
                            this.state.count / this.state.limit,
                        });
                        setTimeout(() => {
                          this.fetchTable();
                        }, 100);
                      }}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.CSVmodal}
          dismiss="false"
          width=""
          close={() =>
            this.setState({
              CSVmodal: false,
              generating: false,
              generateComplete: false,
              csvMode: false,
              limit: 10,
            })
          }
        >
          <div className="py-3 generate-csv-modal d-flex flex-column justify-content-between">
            <h5 className="text-center font-weight-bold">Generate Excel</h5>

            {!this.state.generating && !this.state.generateComplete && (
              <>
                <div className="my-4 text-center d-flex flex-column align-items-center">
                  <div>
                    <File size={18} className="text-dark"></File>{" "}
                    <label htmlFor="">File name</label>
                  </div>
                  <input
                    type="text"
                    className="form-control rounded bg-light file-name-input text-center text-dark"
                    placeholder="File name"
                    value={this.state.csv_file_name}
                    onChange={(e) => {
                      this.setState({ csv_file_name: e.target.value });
                    }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-center">
                  <button
                    onClick={() => {
                      this.setState({
                        generating: true,
                        csvMode: true,
                        limit: 50000,
                      });
                      setTimeout(() => {
                        this.fetchTable();
                      }, 0);
                    }}
                    className="option-card pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round mr-3"
                  >
                    <Settings size={16} />
                    <span className="pl-2 font-weight-bold no-wrap">
                      Generate
                    </span>
                  </button>
                </div>
              </>
            )}
            {this.state.generating && (
              <>
                <div className="d-flex flex-row justify-content-center">
                  <div className="lds-hourglass"></div>
                </div>
                <div></div>
              </>
            )}

            {this.state.generateComplete && (
              <>
                <div className="my-4 text-center d-flex flex-column align-items-center text-success">
                  <CheckCircle size={70}></CheckCircle>
                  <span>Complete</span>
                </div>

                <div className="d-flex flex-row justify-content-center">
                  <a
                    href={"data:text/plain;charset=utf-8," + this.state.CSVURI}
                    download={this.state.csv_file_name + ".csv"}
                    className="option-card pr-4 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round mr-3"
                  >
                    <Download size={16} />
                    <span className="pl-2 font-weight-bold no-wrap">
                      Download
                    </span>
                  </a>
                </div>
              </>
            )}
          </div>
        </Modal>
        <Modal
          visible={this.state.PDFmodal}
          dismiss="false"
          width=""
          close={() =>
            this.setState({
              PDFmodal: false,
              generating: false,
              generateComplete: false,
              pdfMode: false,
              limit: 10,
            })
          }
        >
          <div className="py-3 generate-csv-modal d-flex flex-column justify-content-between">
            <h5 className="text-center font-weight-bold">Send PDF Statement</h5>

            {!this.state.generating && !this.state.generateComplete && (
              <>
                <div className="my-4 text-center d-flex flex-column align-items-center">
                  <div>
                    <File size={18} className="text-dark"></File>{" "}
                    <label htmlFor="">Enter Member Email</label>
                  </div>
                  <input
                    type="email"
                    className="form-control rounded bg-light  text-center text-dark"
                    placeholder="customer@digitalsacco.com"
                    //value={this.state.pdf_file_name}
                    onChange={(e) => {
                      this.setState({ customer_email: e.target.value });
                    }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-center">
                  <button
                    onClick={() => this.generatePdf()}
                    className="option-card pr-3 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round mr-3"
                  >
                    <Settings size={16} />
                    <span className="pl-2 font-weight-bold no-wrap">
                      Send PDF Statement
                    </span>
                  </button>
                </div>
              </>
            )}
            {this.state.generating && (
              <>
                <div className="d-flex flex-row justify-content-center">
                  <div className="lds-hourglass"></div>
                </div>
                <div></div>
              </>
            )}

            {this.state.generateComplete && (
              <>
                <div className="my-4 text-center d-flex flex-column align-items-center text-success">
                  <CheckCircle size={70}></CheckCircle>
                  <span>Complete</span>
                </div>

                <div className="d-flex flex-row justify-content-center">
                  <a
                    href={"data:text/plain;charset=utf-8," + this.state.PDFURI}
                    download={this.state.pdf_file_name + ".pdf"}
                    className="option-card pr-4 d-md-flex d-inline-block my-2 flex-row btn align-items-center btn-outline-primary btn-round mr-3"
                  >
                    <Download size={16} />
                    <span className="pl-2 font-weight-bold no-wrap">
                      Download
                    </span>
                  </a>
                </div>
              </>
            )}
          </div>
        </Modal>
      </>
    );
  }

  componentDidMount() {
    this.fetchTable();
  }

  // eslint-disable-next-line

  fetchTable = () => {
    this.setState({ tableLoading: true });
    let params: any = {
      $skip: this.state.offset,
      $limit: this.state.limit,
    };

    if (this.state.sort !== "") {
      params[`$sort[${this.state.sort}]`] = this.state.sortDirection;
    }
    if (this.state.searchEnabled) {
      let search = this.state.searchValue.replace(/\s/, "+");
      let count = 0;

      if (typeof this.state.search !== "object") {
        params[this.state.search] =
          this.state.search === "msisdn"
            ? Utilities.verifyPhoneNumber(search)
            : search;
        return false;
      }
      this.state.search.map((d: any, i1: any) => {
        params[`$or[${count++}][${d}][$like]`] = `%${
          d === "msisdn" ? parseInt(search) : search
        }%`;
      });
    }
    this.props.fetch(params);
  };

  generatePagination() {
    let count = this.state.count;
    let { limit } = this.state;
    let { offset } = this.state;

    let pagination = [];

    let number = count / limit;
    let position = number * (offset / count);
    position -= 2;
    if (position < 0) position = 0;
    let n = position;

    if (n + 5 > number) {
      n = n - 5 - (n - number);
    }

    while (position < n + 5) {
      let pos = position;
      pagination.push(
        <li
          key={pos}
          className={
            "page-item " +
            (this.state.currentPagination === position ? "active" : "")
          }
        >
          <button
            className="page-link"
            onClick={() => {
              let offset = pos * limit;
              this.setState({ offset, currentPagination: pos });
              setTimeout(() => {
                this.fetchTable();
              }, 100);
            }}
          >
            {pos + 1}
          </button>
        </li>
      );
      position++;
    }

    return pagination;
  }

  generateCSV = () => {
    this.setState({ limit: 50000, csvMode: false });
    let { csvData }: any = this.state;
    let cs = csvData;
    const fields = this.state.titles;
    const opts = { fields };

    cs = cs.map((d: any) => {
      Object.keys(d).map((d1) => {
        if (typeof d[d1] === "object") {
          if (d[d1] && d[d1].$$typeof) {
            if (typeof d[d1].props.children === "string") {
              d[d1] = d[d1].props.children;
              return false;
            }
          }

          d[d1] = "-";
        }
      });
      return d;
    });
    try {
      const parser = new Parser(opts);
      const csv = parser.parse(cs);
      this.setState({
        generating: false,
        generateComplete: true,
        CSVURI: encodeURIComponent(csv),
      });
    } catch (err) {
      this.setState({ generating: false });
      console.error(err);
    }
  };

  generatePdf = () => {};
  updateCount: any = 0;
  csvTimeout: any = null;
  componentWillReceiveProps(props: AppProps) {
    if (typeof props.checked == "object") {
      this.setState({ checked: props.checked });
    }

    if (typeof props.data == "object") {
      let titles;
      let data = props.data;

      if (data.length === 0) {
        titles = this.state.titles;
      } else {
        titles = Object.keys(data[0]);
      }
      let checkboxIDS: any[] = [];
      if (this.state.checkbox) {
        checkboxIDS = data.map((d) => d.hidden.id);
      }

      if (!this.state.csvMode) {
        let c: any = props.data;
        const x = c.total;
        this.setState({
          data,
          titles,
          count: x,
          tableLoading: false,
          checkboxIDS,
        });
        if (this.updateCount > 1) {
          this.updateCount = 0;
          this.setState({ tableLoading: false });
        }
        this.updateCount++;
      } else {
        this.setState({
          csvData: data,
        });

        clearTimeout(this.csvTimeout);
        this.csvTimeout = setTimeout(() => {
          this.generateCSV();
        }, 300);
      }
    }
    if (typeof props.loading !== "undefined" && !this.state.csvMode) {
      this.setState({ loading: props.loading });
    }
  }

  toggleCheckbox = (id: any) => {
    let checked = this.state.checked;
    let index = checked.indexOf(id);
    if (index !== -1) {
      checked.splice(index, 1);
    } else {
      checked.push(id);
    }

    this.props.getChecked(checked);
  };

  checkAll = () => {
    let checked = this.state.checked;
    if (
      !this.state.checkboxIDS.every((val) => this.state.checked.includes(val))
    ) {
      this.state.data.map((d, i) => {
        const hiddenFields: any = d;
        checked.push(hiddenFields.hidden.id);
      });
    } else {
      this.state.checkboxIDS.map((d) => {
        checked.splice(checked.indexOf(d), 1);
      });
    }

    let distinct = (value: any, index: Number, self: any) => {
      return self.indexOf(value) === index;
    };

    checked = checked.filter(distinct);
    this.props.getChecked(checked);
  };
}

export default Table;
