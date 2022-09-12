import { UrlObject } from "url";
import Link from "next/link";
import Icon from "components/Icon/Icon";
import styles from "./CompleteProfileCard.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserInforContext } from "Context/UserInforContext";
import { getUserProfileCompletedSteps } from "utils";
import classNames from "classnames";

interface ProgressCompleteProps {
  currentStep?: number;
  totalSteps?: number;
}

const ProgressComplete = (props: ProgressCompleteProps) => {
  const { currentStep = 0, totalSteps = 5 } = props;

  const formatValueProgress = (): string => {
    return (currentStep * 100) / totalSteps + "%";
  };

  return (
    <div className={styles.progress}>
      <div
        className={styles.progress_completed}
        style={{ width: formatValueProgress() }}
      />
    </div>
  );
};

export interface CompleteProfileCardProps extends ProgressCompleteProps {
  className?: string;
  icon?: string;
  onClick?: () => void;
}

const CompleteProfileCard = (props: CompleteProfileCardProps) => {
  const { className = "", onClick, icon } = props;

  const totalSteps = 9;

  const { user } = useContext(UserInforContext);

  const currentStep = getUserProfileCompletedSteps(user);

  return (
    <div className={classNames(className, styles.card)}>
      <ProgressComplete currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex items-center">
        {icon && <Icon icon={icon} className="mr-4" />}
        <div className={styles.note_cta}>
          {currentStep !== totalSteps ? (
            <div>
              <span>
                {!icon && "👏"} {`${currentStep}/${totalSteps} `} steps to
                complete your profile!
              </span>
              {onClick && (
                <span>
                  <a onClick={onClick}>Complete it.</a>
                </span>
              )}
            </div>
          ) : (
            "Congratulations. Your profile has been completed."
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileCard;
