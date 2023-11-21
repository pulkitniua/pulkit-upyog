// import { Loader } from "@egovernments/digit-ui-react-components";
// import React ,{Fragment}from "react";
// import { useTranslation } from "react-i18next";
// import { useQueryClient } from "react-query";
// import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
// // import { newConfig } from "../../../config/Create/config";
// import { citizenConfig } from "../../../config/Create/citizenconfig";

// const CreateProperty = ({ parentRoute }) => {
//   const queryClient = useQueryClient();
//   const match = useRouteMatch();
//   const { t } = useTranslation();
//   const { pathname } = useLocation();
//   const history = useHistory();
//   const stateId = Digit.ULBService.getStateId();
//   let config = [];
//   const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});
//   let { data: commonFields, isLoading } = Digit.Hooks.pt.useMDMS(stateId, "PropertyTax", "CommonFieldsConfig");
//   const goNext = (skipStep, index, isAddMultiple, key) => {
//     let currentPath = pathname.split("/").pop(),
//       lastchar = currentPath.charAt(currentPath.length - 1),
//       isMultiple = false,
//       nextPage;
//     if (Number(parseInt(currentPath)) || currentPath == "0" || currentPath == "-1") {
//       if (currentPath == "-1" || currentPath == "-2") {
//         currentPath = pathname.slice(0, -3);
//         currentPath = currentPath.split("/").pop();
//         isMultiple = true;
//       } else {
//         currentPath = pathname.slice(0, -2);
//         currentPath = currentPath.split("/").pop();
//         isMultiple = true;
//       }
//     } else {
//       isMultiple = false;
//     }
//     if (!isNaN(lastchar)) {
//       isMultiple = true;
//     }
//     let { nextStep = {} } = config.find((routeObj) => routeObj.route === currentPath);
//     if (typeof nextStep == "object" && nextStep != null && isMultiple != false) {
//       if (nextStep[sessionStorage.getItem("ownershipCategory")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("ownershipCategory")]}/${index}`;
//       } else if (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]) {
//         if (`${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}` === "un-occupied-area") {
//           nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}/${index}`;
//         } else {
//           nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
//         }
//       } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}/${index}`;
//       } else if (nextStep[sessionStorage.getItem("area")]) {
//         // nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;

//         if (`${nextStep[sessionStorage.getItem("area")]}` !== "map") {
//           nextStep = `${nextStep[sessionStorage.getItem("area")]}/${index}`;
//         } else {
//           nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
//         }
//       } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}/${index}`;
//       } else {
//         nextStep = `${nextStep[sessionStorage.getItem("noOofBasements")]}/${index}`;
//         //nextStep = `${"floordetails"}/${index}`;
//       }
//     }
//     if (typeof nextStep == "object" && nextStep != null && isMultiple == false) {
//       if (
//         nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] &&
//         (nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] == "map" ||
//           nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")] == "un-occupied-area")
//       ) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsAnyPartOfThisFloorUnOccupied")]}`;
//       } else if (nextStep[sessionStorage.getItem("subusagetypevar")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("subusagetypevar")]}`;
//       } else if (nextStep[sessionStorage.getItem("area")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("area")]}`;
//       } else if (nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("IsThisFloorSelfOccupied")]}`;
//       } else if (nextStep[sessionStorage.getItem("PropertyType")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("PropertyType")]}`;
//       } else if (nextStep[sessionStorage.getItem("isResdential")]) {
//         nextStep = `${nextStep[sessionStorage.getItem("isResdential")]}`;
//       }
//     }
//     /* if (nextStep === "is-this-floor-self-occupied") {
//       isMultiple = false;
//     } */
//     let redirectWithHistory = history.push;
//     if (skipStep) {
//       redirectWithHistory = history.replace;
//     }
//     if (isAddMultiple) {
//       nextStep = key;
//     }
//     if (nextStep === null) {
//       return redirectWithHistory(`${match.path}/check`);
//     }
//     if (!isNaN(nextStep.split("/").pop())) {
//       nextPage = `${match.path}/${nextStep}`;
//     } else {
//       nextPage = isMultiple && nextStep !== "map" ? `${match.path}/${nextStep}/${index}` : `${match.path}/${nextStep}`;
//     }

//     redirectWithHistory(nextPage);
//   };

//   if(params && Object.keys(params).length>0 && window.location.href.includes("/info") && sessionStorage.getItem("docReqScreenByBack") !== "true")
//     {
//       clearParams();
//       queryClient.invalidateQueries("PT_CREATE_PROPERTY");
//     }

//   const createProperty = async () => {
//     history.push(`${match.path}/acknowledgement`);
//   };

//   function handleSelect(key, data, skipStep, index, isAddMultiple = false) {
//     if (key === "owners") {
//       let owners = params.owners || [];
//       owners[index] = data;
//       setParams({ ...params, ...{ [key]: [...owners] } });
//     } else if (key === "units") {
//       let units = params.units || [];
//       // if(index){units[index] = data;}else{
//       units = data;

//       setParams({ ...params, units });
//     } else {
//       setParams({ ...params, ...{ [key]: { ...params[key], ...data } } });
//     }
//     goNext(skipStep, index, isAddMultiple, key);
//   }

//   const handleSkip = () => {};
//   const handleMultiple = () => {};

//   const onSuccess = () => {
//     clearParams();
//     queryClient.invalidateQueries("PT_CREATE_PROPERTY");
//   };
//   if (isLoading) {
//     return <Loader />;
//   }

//   // commonFields=newConfig;
//   /* use newConfig instead of commonFields for local development in case needed */
//   commonFields = citizenConfig;
//   commonFields.forEach((obj) => {
//     config = config.concat(obj.body.filter((a) => !a.hideInCitizen));
//   });
//   config.indexRoute = "info";
//   const CheckPage = Digit?.ComponentRegistryService?.getComponent("PTCheckPage");
//   const PTAcknowledgement = Digit?.ComponentRegistryService?.getComponent("PTAcknowledgement");
//   return (
//     <Switch>
//       {config.map((routeObj, index) => {
//         const { component, texts, inputs, key } = routeObj;
//         const Component = typeof component === "string" ? Digit.ComponentRegistryService.getComponent(component) : component;
//         return (
//           <Route path={`${match.path}/${routeObj.route}`} key={index}>
//             <Component config={{ texts, inputs, key }} onSelect={handleSelect} onSkip={handleSkip} t={t} formData={params} onAdd={handleMultiple} />
//           </Route>
//         );
//       })}
//       <Route path={`${match.path}/check`}>
//         <CheckPage onSubmit={createProperty} value={params} />
//       </Route>
//       <Route path={`${match.path}/acknowledgement`}>
//         <PTAcknowledgement data={params} onSuccess={onSuccess} />
//       </Route>
//       <Route>
//         <Redirect to={`${match.path}/${config.indexRoute}`} />
//       </Route>
//     </Switch>
//   );
// };

// export default CreateProperty;

import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { newConfig } from "../../../config/Create/citizenconfig";
import { useTranslation } from "react-i18next";
import Timeline from "../../../components/TLTimeline";
import { ULBService } from "../../../../../../libraries/src/services/molecules/Ulb";
import { PTRService } from "../../../../../../libraries/src/services/elements/PTR";
const PTRCreate = () => {
  const createOwnerDetails = () => ({
    applicantName: "",
    mobileNumber: "",
    fatherName: "",
    emailId: "",
    alternateNumber: "",
    key: Date.now(),
  });
  const queryClient = useQueryClient();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("PT_CREATE_PROPERTY", {});
  const match = useRouteMatch();

  const history = useHistory();
  const { pathname } = useLocation();
  // console.log("pathname----->", pathname);
  const currentPath = pathname.split("/").pop();

  const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger } = useForm();
  const { errors } = localFormState;

  const [formData, setFormData] = useState({
    owners: [createOwnerDetails()], // Initial data (empty owner details)
  });
  //const tenantId = Digit.ULBService.getCurrentTenantId();
  // function to update formData dynamically
  const updateFormData = (index, field, value) => {
    setFormData((prevFormData) => {
      const newOwners = [...prevFormData.owners];
      newOwners[index][field] = value;
      return { ...prevFormData, owners: newOwners };
    });
  };

  const handleSetError = (config, localFormState) => {
    setLocalError(config.key, { type: localFormState.errors });
  };
  // const handleNext = (nextRoute) => {
  //   history.push(`${nextRoute}`);
  // };

  const [currentStep, setCurrentStep] = useState(0);
  const [subSteps, setSubSteps] = useState(0);

  const totalSteps = newConfig.length;
  const handleNextOrSubmit = (nextRoute, dontStepUp = false) => {
    console.log("**----Step:", `${currentStep} / ${totalSteps - 1}`);
    if (currentStep == totalSteps - 1) {
      // Last step, so perform submit action
      //  call a function here to handle form submission
      // Digit.PTRService.create(data, tenantId);
      setCurrentStep(currentStep + 1);
      history.push(`${match.path}/check`);
    }
    //else {
    //     setCurrentStep(currentStep + 1);
    //     history.push(`${nextRoute}`);
    //   }
    // };
    if (!dontStepUp) setCurrentStep(currentStep + 1);
    history.push(`${nextRoute}`);
  };
  const onSuccess = () => {
    clearParams();
    queryClient.invalidateQueries("PT_CREATE_PROPERTY");
  };

  const createProperty = async () => {
    console.log("Submitting");
    console.log(formData);
    // const reFormateDated = {
    //   data: {
    //     ...formData,
    //     doc: formData?.documents,
    //   },
    // };
    console.log("first2", formData?.address);
    console.log("check for locality", formData?.address?.locality); // locality -->undefined
    console.log("check for city ", formData?.address?.city?.name); //undefined
    const PetRegistrationApplications = [
      {
        tenantId,
        // applicantName: { ...formData.owners?.applicantName },
        // fatherName: { ...formData.owners?.fatherName },
        // mobileNumber: { ...formData.owners?.mobileNumber },
        // emailId: { ...formData.owners?.emailId },
        ...formData.owners[0],
        petDetails: {
          ...formData.pets[0],
          petType: formData?.pets[0]?.petType?.value,
          breedType: formData?.pets[0]?.breedType?.value,
          petGender: formData?.pets[0]?.petGender?.value,
        },
        address: {
          ...formData?.address,
          city: formData?.address[0]?.city?.name,
          locality: { code: formData?.address[0]?.locality?.code, area: formData?.address[0]?.locality?.area },
        },
        documents: formData?.documents?.documents,
        workflow: {
          businessService: "ptr",
          action: "APPLY",
          moduleName: "pet-services",
        },
      },
    ];
    Digit.PTRService.create(PetRegistrationApplications, tenantId);
    //history.push(`${match.path}/acknowledgement`);
  };

  // const onPetSubmit = (data) => {
  //   console.log("dataaaaaaaaaaaaaaaaaa", data);

  //
  const CheckPage = Digit?.ComponentRegistryService?.getComponent("PTCheckPage");
  const PTAcknowledgement = Digit?.ComponentRegistryService?.getComponent("PTAcknowledgement");

  return (
    <div>
      <div>
        <Timeline currentStep={currentStep} flow={0} />
      </div>
      <div className="card ">
        <Switch>
          {/* {newConfig.map((conf, idx) => {
            const { head } = conf;
            const { key, route, component } = conf.body[0];
            const Component = Digit?.ComponentRegistryService?.getComponent(component);

            return (
              <Route key={`${idx}`} path={`${match.path}/${route}`}>
                {conf.head && <header className="card-header">{head}</header>}
                <Component
                  config={{ key }}
                  onSelect={(key, data) => {
                    console.log("***onSelect: ", key, data);
                    const newData = formData;
                    newData[key] = data;
                    setFormData(newData);
                  }}
                  formData={formData}
                  setError={() => handleSetError(conf.body[0], localFormState)}
                  formState={localFormState}
                  clearErrors={clearLocalErrors}
                  userType={""}
                  t={t}
                 
                />

                <div>
                  <button
                    type="button"
                    className="submit-bar"
                    style={{ color: "white" }}
                    onClick={() => {
                     
                      handleNextOrSubmit(`${match.path}/${newConfig[idx + 1]?.body[0]?.route}`);
                      
                    }}
                  >
                    
                    Next
                  </button>
                </div>
              </Route>
            );
          })} */}
          {newConfig.map((conf, idx) => {
            const { head, body } = conf;

            // if body consists of only 1 component , render that component
            if (body.length === 1) {
              const { key, route, component } = body[0];
              const Component = Digit?.ComponentRegistryService?.getComponent(component);

              return (
                <Route key={`${idx}`} path={`${match.path}/${route}`}>
                  {head && <header className="card-header">{head}</header>}
                  <Component
                    config={{ key }}
                    onSelect={(key, data) => {
                      console.log("***onSelect: ", key, data, formData);
                      const newData = formData;
                      newData[key] = data;
                      setFormData(newData);
                    }}
                    formData={formData}
                    setError={() => handleSetError(body[0], localFormState)}
                    formState={localFormState}
                    clearErrors={clearLocalErrors}
                    userType={""}
                    t={t}
                  />

                  <div>
                    <button
                      type="button"
                      className="submit-bar"
                      style={{ color: "white" }}
                      onClick={() => {
                        // If there is only one component, navigate to the next step directly
                        handleNextOrSubmit(`${match.path}/${newConfig[idx + 1]?.body[0]?.route}`);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </Route>
              );
            } else {
              // Render multiple components sequentially
              // let subSteps = 0;
              return body.map((step, stepIndex) => {
                const { key, route, component } = step;
                const Component = Digit?.ComponentRegistryService?.getComponent(component);

                return (
                  <Route key={`${idx}-${stepIndex}`} path={`${match.path}/${route}`}>
                    {head && <header className="card-header">{head}</header>}
                    <Component
                      config={{ key }}
                      onSelect={(key, data) => {
                        console.log("***onSelect: ", data);
                        const newData = formData;
                        newData[key] = data;
                        setFormData(newData);
                      }}
                      formData={formData}
                      setError={() => handleSetError(step, localFormState)}
                      formState={localFormState}
                      clearErrors={clearLocalErrors}
                      userType={""}
                      t={t}
                    />

                    <div>
                      <button
                        type="button"
                        className="submit-bar"
                        style={{ color: "white" }}
                        onClick={() => {
                          // Navigate to the next step in the sequence
                          // alert(subSteps === body.length - 1 ? `${newConfig[idx + 1]?.body[0]?.route}` : `${body[stepIndex + 1]?.route}`);
                          if (subSteps === body.length - 1) {
                            // setSubSteps(0);
                            handleNextOrSubmit(`${match.path}/${newConfig[idx + 1]?.body[0]?.route}`);
                            // handleNextOrSubmit(`${match.path}/${body[stepIndex + 1]?.route}`);
                            return;
                          }
                          setSubSteps(subSteps + 1);
                          handleNextOrSubmit(`${match.path}/${body[stepIndex + 1]?.route}`, true);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </Route>
                );
              });
            }
          })}
          <Route path={`${match.path}/check`}>
            <CheckPage onSubmit={createProperty} value={params} />
          </Route>
          <Route path={`${match.path}/acknowledgement`}>
            <PTAcknowledgement data={params} onSuccess={onSuccess} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PTRCreate;
