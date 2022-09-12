import { UrlObject } from "url";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "components/Icon/Icon";
import styles from "./CompleteBizUserCard.module.scss";
import { useEffect, useState } from "react";
import get from "lodash/get";
import Checkbox from "components/Checkbox/Checkbox";
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

export interface IOption {
  label?: string;
  value?: string;
  checked?: boolean;
  onClick?: () => void;
}

export interface CompleteProfileCardProps extends ProgressCompleteProps {
  className?: string;
  icon?: string;
  onClick?: () => void;
  options: IOption[];
}

const CompleteProfileCard = (props: CompleteProfileCardProps) => {
  const { className, onClick, icon, options = [] } = props;
  const router = useRouter();
  const totalSteps = 9;

  const currentStep = options.filter((item) => item.checked).length;

  return (
    <div className={classNames(className, styles.card)}>
      {icon && <Icon icon={icon} className="mr-4" />}
      {currentStep !== totalSteps ? (
        <div>
          <div className={styles.header}>
            <p className={styles.title}>Onboarding Checklist</p>
            <span>
              {!icon && "👏"} {`${currentStep}/${totalSteps} `} steps to
              complete your profile!
            </span>
          </div>
          {/* {onClick && ( */}
          <ProgressComplete currentStep={currentStep} totalSteps={totalSteps} />
          <br />
          <span>
            Tips: Fill in information to increase your profile's competence.
            Don’t forget to click Save change after adding information.
          </span>
        </div>
      ) : (
        "👏 Congratulations. Your listing has been completed."
      )}
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          label={opt.label}
          id={opt.value}
          className={classNames(
            styles.text,
            styles.item,
            opt.checked && styles.checked
          )}
          checked={opt.checked}
          onClick={opt.onClick}
        />
      ))}
    </div>
  );
};

export default CompleteProfileCard;
