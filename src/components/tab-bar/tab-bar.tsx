import classNames from "classnames";
import type { FC, ReactElement, ReactNode } from "react";
import React, { isValidElement } from "react";
import { NativeProps, withNativeProps } from "@/components/utils/native-props";
import { traverseReactNode } from "@/components/utils/traverse-react-node";
import { usePropsValue } from "@/components/utils/use-props-value";
import { mergeProps } from "@/components/utils/with-default-props";
import Badge, { BadgeProps } from "@/components/badge";
import SafeArea from "@/components/safe-area";

export type TabBarItemProps = {
  icon?: ReactNode | ((active: boolean) => ReactNode);
  title?: ReactNode | ((active: boolean) => ReactNode);
  badge?: BadgeProps["content"];
  onClick?: () => void;
} & NativeProps;

/* istanbul ignore next */
export const TabBarItem: FC<TabBarItemProps> = () => {
  return null;
};

export type TabBarProps = {
  activeKey?: string | null;
  defaultActiveKey?: string | null;
  onChange?: (key: string) => void;
  safeArea?: boolean;
  children?: ReactNode;
} & NativeProps;

const classPrefix = `adm-tab-bar`;

const defaultProps = {
  safeArea: false,
};

export const TabBar: FC<TabBarProps> = (p) => {

  const props = mergeProps(defaultProps, p);

  let firstActiveKey: string | null = null;

  const items: ReactElement<TabBarItemProps>[] = [];

  // 这个函数收集了 TabBarItem 并找到第一个TabBarItem的key赋值给firstActiveKey
  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<TabBarItemProps>(child)) return;
    const key = child.key;
    if (typeof key !== "string") return;
    if (index === 0) {
      firstActiveKey = key;
    }
    items.push(child);
  });

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey, // activeKey 传入的激活属性
    defaultValue: props.defaultActiveKey ?? firstActiveKey, // 传入默认值，优先取defaultActiveKey，没有就取第一个
    onChange: (v) => {
      if (v === null) return;
      props.onChange?.(v);
    },
  });

  return withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-wrap`}>
        {items.map((item) => {
          const active = item.key === activeKey;

          function renderContent() {
            const iconElement = item.props.icon && (
              <div className={`${classPrefix}-item-icon`}>
                {typeof item.props.icon === "function"
                  ? item.props.icon(active)
                  : item.props.icon}
              </div>
            );
            const titleElement = item.props.title && (
              <div
                className={classNames(
                  `${classPrefix}-item-title`,
                  Boolean(iconElement) && `${classPrefix}-item-title-with-icon`
                )}
              >
                {typeof item.props.title === "function"
                  ? item.props.title(active)
                  : item.props.title}
              </div>
            );
            if (iconElement) {
              return (
                <>
                  <Badge
                    content={item.props.badge}
                    className={`${classPrefix}-icon-badge`}
                  >
                    {iconElement}
                  </Badge>
                  {titleElement}
                </>
              );
            } else if (titleElement) {
              return (
                <Badge
                  content={item.props.badge}
                  className={`${classPrefix}-title-badge`}
                >
                  {titleElement}
                </Badge>
              );
            }
            return null;
          }

          return withNativeProps(
            item.props,
            <div
              key={item.key}
              onClick={() => {
                const { key } = item;

                if (key === undefined || key === null) return;

                setActiveKey(key.toString());
                item.props.onClick?.();
              }}
              className={classNames(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
              })}
            >
              {renderContent()}
            </div>
          );
        })}
      </div>

      {props.safeArea && <SafeArea position="bottom" />}
    </div>
  );
};
