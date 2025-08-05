import * as extensionConfig from '../extension.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void {}

export function about(): void {
	eda.sys_Dialog.showInformationMessage(
		eda.sys_I18n.text('EasyEDA extension SDK v', undefined, undefined, extensionConfig.version),
		eda.sys_I18n.text('About'),
	);
}


/**
 * 打开扩展API Agent
 */
export function openApiAgent(): void {
	
	eda.sys_IFrame.openIFrame(
		'/iframe/api-agent.html', 
		800, // 宽度
		600, // 高度
	);
}
