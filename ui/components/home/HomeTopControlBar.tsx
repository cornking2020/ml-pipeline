import { TopControlPanel } from "../TopControlPanel";
import React from "react";
import { MessageDisplay } from "../../store/Enums";
import { useCreateWorkloadMutation, useDeleteWorkloadMutation, useGetWorkloadsQuery } from "../../store/GraphqlSlice";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "@mui/material/Link";

function HomeTopControlBar() {
  const router = useRouter();
  const { data: workloads, refetch } = useGetWorkloadsQuery();

  const [createWorkload] = useCreateWorkloadMutation();
  const [deleteWorkload] = useDeleteWorkloadMutation();

  const handleCreateWorkload = () => {
    createWorkload({ id: 0, title: "demo" });
  };

  const handleDeleteWorkload = () => {
    deleteWorkload({ id: 0 });
  };

  return (
    <TopControlPanel
      title={MessageDisplay.TITLE_WELCOME}
      center={<></>}
      down={
        <>
          <ButtonGroup variant={`outlined`}>
            <Button onClick={refetch}>{MessageDisplay.REFETCH}</Button>
            <Button onClick={handleCreateWorkload}>Install Application</Button>
            <Button onClick={handleDeleteWorkload}>Uninstall Application</Button>
          </ButtonGroup>
          {workloads && (
            <>
              <Typography variant={`subtitle2`} gutterBottom>
                Access Application
              </Typography>
              <ul>
                {[{
                  name: "JupyterHub",
                  link: "http://jupyterhub.127.0.0.1.nip.io"
                },
                  {
                    name: "Apache Airflow",
                    link: "http://airflow.127.0.0.1.nip.io"
                  }].map(
                  (application) =>
                    <li
                      key={application.name}>
                      <Link
                        href={application.link}
                        target={`_blank`}
                      >
                        {application.name}
                      </Link>
                    </li>
                )}
              </ul>
            </>
          )}
        </>
      }
    />
  );
}

export default HomeTopControlBar;