import "./tab-bar.less";
import { TabBar, TabBarItem } from "./tab-bar";
import { attachPropertiesToComponent } from "@/components/utils/attach-properties-to-component";

export type { TabBarProps, TabBarItemProps } from "./tab-bar";
// 添加属性到组件上（其实就是在TabBar挂载Item属性，让你可以直接TabBar.Item这样使用）
export default attachPropertiesToComponent(TabBar, {
  Item: TabBarItem,
});
